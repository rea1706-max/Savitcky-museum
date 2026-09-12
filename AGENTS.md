# Repository rules / Правила репозитория

These instructions apply to the entire repository. The Russian and English sections describe the same requirements. If they differ, follow the stricter requirement and the user's latest explicit instruction.

Эти инструкции действуют для всего репозитория. Русская и английская версии описывают одинаковые требования. Если формулировки расходятся, применяй более строгое требование и последнее явное указание пользователя.

## Русский

### Git и доставка изменений

- Конечная ветка для всех изменений агента — `main` в репозитории `origin` (`https://github.com/rea1706-max/Savitcky-museum.git`). Не оставляй завершённую работу только локально: после проверок создай коммит и отправь результат в `origin/main`.
- Нормальный процесс изменений — отдельная ветка и Pull Request в `main`. Перед мержем обязателен ревью и успешные автоматические проверки. Если пользователь прямо поручил отправить изменения сразу в `main` или репозиторий работает без PR-процесса, разрешён прямой push в `main` после всех проверок.
- Для `develop` действуют те же требования к проверкам и автоматическому деплою, если эта ветка используется.
- Сообщения коммитов должны соответствовать Conventional Commits: `type(scope): краткое описание`, например `feat(auth): добавлен JWT`.
- Используй семантическое версионирование: `vMAJOR.MINOR.PATCH`, например `v1.2.3`.

### CI/CD и деплой

- Изменения в основных ветках `main` и `develop` должны автоматически деплоиться через GitHub Actions или эквивалентный CI/CD.
- Перед деплоем CI обязан запускать линтер, форматирование или его проверку, тесты, проверку типов и production-сборку. Любая ошибка блокирует деплой.
- Не обходи защиту веток, обязательные статусы или ревью. Если защита ветки требует Pull Request, создай PR с целевой веткой `main`.

### Качество кода и тестирование

- Соблюдай единый кодстайл проекта. Линтеры и форматтеры обязательны; не отключай правила без документированной причины.
- Каждая новая функция и каждое исправление ошибки должны сопровождаться содержательными тестами, когда поведение можно проверить автоматически.
- Минимальное покрытие нового и изменённого кода: 80% строк, функций и инструкций, 75% ветвей. Общее покрытие проекта не должно снижаться.
- Проект должен одинаково работать в поддерживаемых ОС, браузерах и размерах экранов. Не используй платформозависимые пути и команды без кроссплатформенной альтернативы.

### Мультиязычность и документация

- Пользовательские интерфейсы и документация должны быть доступны минимум на русском и английском языках. Другие языки добавляются по требованиям проекта.
- При изменении поведения, настройки, API, процесса разработки или деплоя обновляй связанные разделы README, Wiki и инструкции в том же изменении.
- Если для проекта применима генерация документации из исходного кода, используй подходящий инструмент, например TypeDoc, Sphinx или Doxygen, и запускай его в CI.

### Безопасность и зависимости

- Секреты, токены, ключи и пароли хранятся только в GitHub Secrets или в одобренном хранилище секретов. Никогда не добавляй их в код, историю Git, логи или документацию.
- Локальные `.env`-файлы не коммить. В репозитории разрешены только безопасные шаблоны вроде `.env.example` без реальных значений.
- CI должен автоматически проверять зависимости на известные уязвимости. Критические и высокие уязвимости блокируют релиз до устранения или документированного исключения.
- Все зависимости должны быть зафиксированы в lock-файлах, например `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` или эквиваленте для используемого менеджера пакетов.

### Эксплуатация и окружения

- Каждый развёрнутый проект должен иметь базовое структурированное логирование, мониторинг ошибок и доступности, например Sentry, Prometheus или эквивалентные средства.
- Для баз данных и важных конфигураций должны быть автоматические резервные копии с документированной политикой хранения и периодической проверкой восстановления.
- Используй Docker или эквивалентный воспроизводимый способ описания среды разработки, CI и деплоя. Версии среды и системных зависимостей должны быть зафиксированы.

## English

### Git and change delivery

- The final destination for every agent change is the `main` branch of `origin` (`https://github.com/rea1706-max/Savitcky-museum.git`). Do not leave completed work only on the local machine: after validation, commit it and deliver it to `origin/main`.
- The normal workflow is a dedicated branch and a Pull Request targeting `main`. Review and successful automated checks are required before merge. A direct push to `main` is allowed only when the user explicitly requests it or the repository operates without a PR workflow, and only after all required checks pass.
- Apply the same validation and automatic deployment requirements to `develop` when that branch is used.
- Commit messages must follow Conventional Commits: `type(scope): short description`, for example `feat(auth): add JWT support`.
- Use semantic versioning: `vMAJOR.MINOR.PATCH`, for example `v1.2.3`.

### CI/CD and deployment

- Changes to the primary branches `main` and `develop` must deploy automatically through GitHub Actions or equivalent CI/CD.
- Before deployment, CI must run linting, formatting or a formatting check, tests, type checking, and a production build. Any failure blocks deployment.
- Do not bypass branch protection, required status checks, or reviews. If branch protection requires a Pull Request, create a PR targeting `main`.

### Code quality and testing

- Follow the project's shared code style. Linters and formatters are mandatory; do not disable rules without a documented reason.
- Every new feature and bug fix must include meaningful tests whenever the behavior can be verified automatically.
- Minimum coverage for new and changed code is 80% for lines, functions, and statements, and 75% for branches. Total project coverage must not decrease.
- The project must behave consistently across supported operating systems, browsers, and viewport sizes. Avoid platform-specific paths and commands unless a cross-platform alternative is provided.

### Internationalization and documentation

- User interfaces and project documentation must be available in at least Russian and English. Add other languages when project requirements call for them.
- When behavior, configuration, APIs, development workflow, or deployment changes, update the related README, Wiki, and instructions in the same change.
- When code-generated documentation is appropriate, use a suitable tool such as TypeDoc, Sphinx, or Doxygen and run it in CI.

### Security and dependencies

- Store secrets, tokens, keys, and passwords only in GitHub Secrets or an approved secret store. Never commit them to code, Git history, logs, or documentation.
- Do not commit local `.env` files. Only safe templates such as `.env.example` without real values may be tracked.
- CI must automatically scan dependencies for known vulnerabilities. Critical and high-severity findings block release until fixed or covered by a documented exception.
- Pin dependencies with the appropriate lock file, such as `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or the equivalent for the selected package manager.

### Operations and environments

- Every deployed project must provide basic structured logging plus error and availability monitoring, for example Sentry, Prometheus, or equivalent tooling.
- Databases and important configuration must have automatic backups with a documented retention policy and periodic restore verification.
- Use Docker or an equivalent reproducible definition for development, CI, and deployment environments. Pin environment and system dependency versions.
