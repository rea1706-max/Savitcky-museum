# Импорт каталога / Catalogue import

## Русский

### Что это

`scripts/catalog/import-catalog.mjs` переносит художников и произведения из JSON-выгрузки
в каталог сайта (`src/data/catalog.json`). Сайт этот файл пока не читает: импорт не меняет
ничего, что видят посетители, пока коллекция не будет отдельно подключена к страницам.

### Правила безопасности

- **По умолчанию — пробный запуск (dry-run).** Скрипт проверяет файл, сравнивает его с каталогом
  и печатает, что изменилось бы. Ничего не записывается.
- **Запись — только с двумя флагами** `--write --confirm`, только если в файле нет ошибок,
  и только новых записей. Записи добавляются со статусом `draft` (черновик).
- **Существующие записи никогда не перезаписываются.** Если запись с тем же id отличается по
  данным источника, это «конфликт» в отчёте. Правки редакции (раздел коллекции, публикация,
  переводы, которых нет в источнике) сохраняются и показываются отдельно.
- **Дубликаты** (та же страница источника или то же название + автор + дата под другим id)
  пропускаются и попадают в отчёт.
- **Изображения не скачиваются.** Скрипт не делает сетевых запросов. Локальная копия
  (`image.localPath`) допускается только при `rightsStatus` = `cleared_public_domain`,
  `cleared_cc0` или `licensed` и `mayRehost: true`.
- У каждой записи сохраняются URL источника, дата обращения, подпись к репродукции и статус прав;
  у партии — страницы источника, благодарностей и библиографии.

### Команды

```bash
# Пробный запуск по всему файлу
npm run catalog:import -- --input data/catalog-sources/nukus_open_museum_pilot.json

# Пробный запуск по выбранным произведениям (их художники подтягиваются сами)
npm run catalog:import -- --input <file.json> --only id1,id2,id3

# Отчёт в JSON
npm run catalog:import -- --input <file.json> --report report.json

# Запись (только после согласования)
npm run catalog:import -- --input <file.json> --write --confirm

# Тесты
npm test
```

Другие параметры: `--store <path>` — другой файл каталога (например, тестовый),
`--batch <id>` — имя партии, `--source-locale <kk|ru|uz|en>` — язык источника (по умолчанию `ru`).

### Сопоставление полей (пилот `nukus_open_museum_pilot.json`, схема 1.0)

| Поле источника                        | Поле каталога              | Замечание                                                                                                 |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `artists[].id`                        | `id`                       | Совпадает.                                                                                                |
| `artists[].name`                      | `name.ru`                  | Каталог многоязычный; kk/uz/en пусты.                                                                     |
| `artists[].lifeDates`                 | `lifeDates`                | Совпадает, даты проверяются.                                                                              |
| `artists[].groups`, `education`       | `groups`, `education`      | Только на русском.                                                                                        |
| `artists[].biography`                 | `biography.ru`             | В пилоте пусто у всех 3 художников.                                                                       |
| `artists[].worksCountOnSourceProfile` | —                          | Не переносится: это статистика сайта-источника.                                                           |
| `artworks[].title`                    | `title.ru`                 | kk/uz/en пусты.                                                                                           |
| `artworks[].date`                     | `date`                     | Свободный текст («1923–1924»); год отдельно не выделен, сортировать по году пока нельзя. 2 из 3 без даты. |
| `artworks[].artistId`                 | `artistId`                 | 1 из 3 (Тарасов) без записи художника — показывается `artistNameAsDisplayed`.                             |
| `artworks[].dimensions`               | `dimensions`               | 1 из 3 без размеров.                                                                                      |
| `artworks[].medium`, `keywords`       | `medium.ru`, `keywords.ru` | Только на русском.                                                                                        |
| `artworks[].image`                    | `image`                    | Все 7 полей сохраняются как есть. У всех 3 — `unverified`, показ запрещён.                                |
| `artworks[].source`                   | `source`                   | Совпадает.                                                                                                |
| —                                     | `category`                 | **Нет в источнике.** Нужен для четырёх карточек коллекции; назначается вручную.                           |
| —                                     | `publicationStatus`        | Всегда `draft` при импорте.                                                                               |
| —                                     | инвентарный номер          | **Нет в источнике.** Главный идентификатор музея — стоит запросить.                                       |

Уже имеющиеся данные проекта: модели художников и произведений не было. В файлах переводов есть
8 записей `collectionPage.artworks` (w1–w8), которые нигде не используются и не сверены
с источниками. Пять изображений в `public/images/collection/` используются на главной;
импорт их не касается, их права нужно проверить отдельно.

### Проверка на трёх произведениях (24.10.2026)

Пробный запуск, отказ записи без `--confirm`, запись в тестовый каталог, повторный запуск
(«без изменений»), ручная правка раздела и перевода (сохранена, не конфликт) — всё прошло.
Рабочий каталог `src/data/catalog.json` не создавался.

### План расширения на весь каталог

1. **Источник данных.** Лучше всего — выгрузка музея с инвентарными номерами. Добавить поле
   `inventoryNumber` в модель (схема 1.1); до этого импорт будет сообщать о нём как о неизвестном поле.
2. **Права на изображения.** Для каждой работы — статус прав. Запросить разрешения у музея,
   создателей каталога и фотографов (страница благодарностей источника). Пока прав нет, сайт
   показывает карточку без репродукции со ссылкой на страницу источника. Отдельно проверить
   авторские права художников, у которых они ещё действуют.
3. **Партии по 50–100 работ:** dry-run → разбор отчёта → запись → отдельный коммит →
   выборочная сверка 5 записей с источником.
4. **Разделы коллекции:** таблица «художник → раздел по умолчанию», согласованная с музеем;
   исключения — вручную.
5. **Переводы:** имена (транслитерация), названия и техника на kk/uz/en; проверка носителем.
   Хранятся как правки редакции и не затираются повторным импортом.
6. **Подключение к сайту:** фильтр по четырём карточкам, страницы произведения и художника,
   показ только `published` и только изображений с подтверждёнными правами. Страницы
   генерируются на сервере, чтобы 1000 записей не загружались в браузер целиком.
7. **Объём.** 1000 работ — это примерно 1–1,5 МБ JSON, для хранения в репозитории нормально.
   Если каталог вырастет до нескольких тысяч с частыми правками, перейти на базу данных.

## English

### What it is

`scripts/catalog/import-catalog.mjs` moves artists and artworks from a JSON export into the
site catalogue (`src/data/catalog.json`). The site does not read that file yet, so an import
changes nothing visitors see until the collection is wired to the pages.

### Safety rules

- **Dry run by default.** It validates, compares with the catalogue and prints what would change.
- **Writing needs both `--write --confirm`**, a file with no errors, and adds only new records,
  as `draft`.
- **Existing records are never overwritten.** A differing source field is a reported conflict;
  editorial edits (collection section, publication, translations the source lacks) are kept and
  listed separately.
- **Duplicates** (same source page, or same title + artist + date under another id) are skipped
  and reported.
- **No images are downloaded**; the importer makes no network requests. A local copy
  (`image.localPath`) is allowed only with a cleared `rightsStatus` and `mayRehost: true`.
- Every record keeps its source URL, access date, reproduction credit and rights status; each
  batch keeps the source index, credits and references pages.

### Commands

```bash
npm run catalog:import -- --input <file.json>                    # dry run
npm run catalog:import -- --input <file.json> --only id1,id2     # selected works and their artists
npm run catalog:import -- --input <file.json> --report r.json    # JSON report
npm run catalog:import -- --input <file.json> --write --confirm  # write, after approval only
npm test
```

Options: `--store <path>` (another catalogue file), `--batch <id>`, `--source-locale <kk|ru|uz|en>`
(default `ru`).

### Field mapping and gaps

See the table in the Russian section. In short: names, titles, medium and keywords arrive in
Russian only; `worksCountOnSourceProfile` is dropped; dates are free text; one of three works has
no artist record and one has no dimensions; all three images are `unverified` and may not be shown.
The source has no collection section (`category`) and no inventory number. The project had no
artist or artwork model; eight unused, unverified `collectionPage.artworks` entries exist in the
locale files.

### Three-work trial (2026-10-24)

Dry run, refused unconfirmed write, write to a scratch catalogue, repeat run (unchanged), and a
hand edit of section and translation (kept, not a conflict) all behaved as intended. The real
`src/data/catalog.json` was not created.

### Expansion plan

1. Prefer the museum's own export with inventory numbers; add `inventoryNumber` (schema 1.1).
2. Clear image rights per work (museum, catalogue authors, photographers); until then show the
   record without a reproduction, linking to the source page. Check artists' own copyright.
3. Import in batches of 50–100: dry run → review → write → one commit → spot-check 5 records.
4. Assign collection sections from an artist → section table agreed with the museum.
5. Translate into kk/uz/en with native review; translations are editorial and survive re-imports.
6. Wire the site: four-card filter, artwork and artist pages, only `published` records and
   cleared images, rendered on the server.
7. About 1–1.5 MB of JSON for 1,000 works is fine in the repository; move to a database if the
   catalogue grows to several thousand frequently edited records.
