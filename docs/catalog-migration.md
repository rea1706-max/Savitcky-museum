# Инструмент миграции каталога Нукусского музея / Nukus Museum Catalog Migration Tool

## Русский

### 1. Архитектурный контекст и выводы расследования (Phase 1)

1. **Существующий стек и архитектура:**
   - **Фреймворк:** Next.js 15.5.18 (App Router), React 19, TypeScript, TailwindCSS, CSS Modules.
   - **Хранилище каталога:** `src/data/catalog.json` со строгой валидацией (`scripts/catalog/validate.mjs`).
   - **Компоненты отображения:** `src/app/collection/page.tsx`, `CollectionExplorer.tsx`, `CollectionWorks.tsx`, `ArtworkDetail.tsx`.
   - **Почему картины не отображались на сайте:**
     В `src/lib/catalog.ts` функция `visibleImage(artwork)` намеренно возвращает `null`, если права на изображение не подтверждены:
     ```ts
     export function visibleImage(artwork: CatalogArtwork): string | null {
       const { image } = artwork;
       return image.localPath && image.mayRehost && CLEARED.includes(image.rightsStatus)
         ? image.localPath
         : null;
     }
     ```
     В текущем `catalog.json` все записи имели `localPath: null`, `mayRehost: false`, `rightsStatus: "unverified"`, а файлы картин не были скачаны локально. Компонент `CollectionWorks.tsx` при отсутствии разрешённого локального пути выводит плашку `Нет репродукции`.

2. **Особенности сайта-источника (`https://nukus.open-museum.net/`):**
   - **Истекший SSL-сертификат источника:** TLS-сертификат домена `nukus.open-museum.net` просрочен (`CERT_HAS_EXPIRED`). Для выполнения краулинга инструмент на время запросов к источнику отключает строгую проверку сертификата (`NODE_TLS_REJECT_UNAUTHORIZED = '0'`).
   - **Файл robots.txt:** Возвращает `404 Not Found` (ограничения не установлены).
   - **Структура страниц экспонатов:** Ссылки на произведения в профилях художников выполнены не через обычные теги `<a href>`, а через события JavaScript:
     `onClick="window.location='/exhibit/get/{id}/'"`. Инструмент распознает оба варианта.
   - **Разрешение изображений:** На странице экспоната в теге `<img>` выводится `/i/gallery/normal/{hash}.jpg`, а в Fancybox — `/i/gallery/orig/{hash}.jpg`. Анализ бинарных данных показал, что папка `/normal/` содержит изображения более высокого разрешения (например, 1000 × 1227 пикселей, ~1.1 МБ), чем `/orig/` (880 × 1080 пикселей, ~495 КБ). Инструмент автоматически выбирает наилучшее доступное разрешение.

---

### 2. Структура выходных данных (Phase 5)

Инструмент сохраняет все данные в отдельную директорию `museum-import/`:
```text
museum-import/
  ├── data/
  │   ├── artists.json               # Структурированные метаданные художников
  │   ├── artworks.json              # Метаданные экспонатов со стабильными ID и связью artistId
  │   └── catalog-import-package.json # Пакет, 100% совместимый с scripts/catalog/import-catalog.mjs
  ├── images/
  │   ├── exhibit-27.jpg             # Проверенные бинарные файлы картин (JPEG, non-zero size)
  │   └── ...
  ├── manifest.json                  # Манифест с SHA256-хэшами, статусами, размерами и проверкой дубликатов
  ├── errors.json                    # Журнал недоступных страниц / сбоев
  └── report.json                    # Итоговый отчет и сопоставление счетчиков профилей и найденных работ
```

#### Разделение полей в `artworks.json`:
- `sourcePageUrl`: ссылка на страницу экспоната
- `sourceImageUrl`: прямая ссылка на исходное изображение максимального разрешения
- `localImagePath`: путь к локальной копии в `museum-import/images/`
- `imageCredit`: атрибуция и сведения о фотографе / источнике
- `rightsStatus`: `"unverified"` (безопасное значение по умолчанию)
- `mayPublish`: `false` (по умолчанию, до юридической проверки прав)

---

### 3. Надежность и режимы работы (Phase 6)

- **Пилотный режим (`--pilot`):** Обрабатывает первых 3 художников и все их произведения (10 произведений в тестовой выборке).
- **Полный режим (`--full`):** Обходит всех 123 доступных художников каталога.
- **Холостой режим (`--dry-run`):** Собирает полные метаданные и проверяет доступность изображений без их сохранения на диск.
- **Докачка / Checkpoints (`--resume`):** Прогресс сохраняется в `museum-import/.checkpoint.json` после каждого художника. При сбоях сети скрипт продолжает с места остановки без повторных запросов.
- **Контроль дубликатов:** Вычисляется хэш SHA-256 каждого файла. Одинаковые изображения фиксируются в манифесте как дубликаты без склеивания разных произведений.
- **Ограничение нагрузки (`--delay`):** Пауза по умолчанию 250 мс между сетевыми запросами, поддержка экспоненциального отката при временных ошибках сети.

---

### 4. Команды запуска

```bash
# 1. Запуск пилотного режима (3 художника, сохранение картинок и метаданных)
node scripts/migrate-catalog.mjs --pilot

# 2. Запуск полного краулинга всех 123 художников
node scripts/migrate-catalog.mjs --full

# 3. Возобновление прерванного краулинга
node scripts/migrate-catalog.mjs --resume

# 4. Пробный запуск без скачивания картинок
node scripts/migrate-catalog.mjs --dry-run

# 5. Ограничение количества художников (например, 10 художников)
node scripts/migrate-catalog.mjs --limit 10

# 6. Запуск юнит-тестов парсеров и валидаторов
npm test

# 7. Проверка совместимости сформированного пакета с импортером каталога проекта
npm run catalog:import -- --input museum-import/data/catalog-import-package.json
```

---

### 5. Подключение к сайту (Phase 7)

После того как выгрузка сформирована и права на репродукции проверены:
1. Запустите сухой прогон импортера:
   ```bash
   npm run catalog:import -- --input museum-import/data/catalog-import-package.json
   ```
2. Для записи в каталог продакшена (`src/data/catalog.json`):
   ```bash
   npm run catalog:import -- --input museum-import/data/catalog-import-package.json --write --confirm
   ```
3. Для тех картин, права на которые подтверждены:
   - Скопируйте файлы из `museum-import/images/` в `public/images/collection/works/`.
   - В `src/data/catalog.json` укажите соответствующий `localPath`, статус прав (`cleared_public_domain`, `cleared_cc0` или `licensed`) и `mayRehost: true`.
   - После этого они автоматически появятся в сетке каталога `/collection`.
