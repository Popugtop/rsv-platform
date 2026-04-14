# РСВ Платформа — Россия: страна возможностей

Образовательный лендинг-каталог возможностей для самореализации в России: гранты, конкурсы, стажировки, обучение, форумы. Проект подготовлен в рамках курса **«Основы российской государственности»**, ТюмГУ, 2026.

---

## Стек

| Технология | Версия | Зачем |
|---|---|---|
| React | 18 | UI |
| TypeScript | 5 (strict) | Типизация |
| Tailwind CSS | 3 | Стили |
| Vite | 5 | Сборка |
| React Router | 7 | Страничная навигация |
| Lucide React | 0.441 | Иконки |
| nginx | alpine | Раздача статики в Docker |

## Структура страниц

```
/           — Главная: hero, статистика, карточки направлений
/catalog    — Каталог: поиск + фильтрация по типу и аудитории, 13 программ
/knowledge  — База знаний: аккордеон с 12 терминами, поиск
/links      — Полезные ссылки: 6 ресурсов по группам
/about      — О проекте: миссия и статистика платформы
```

## Быстрый старт

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev       # http://localhost:5173

# Сборка для продакшена
npm run build
```

## Docker

Проект собирается в multi-stage Docker образ: `node:20-alpine` для сборки → `nginx:alpine` для раздачи статики.

```bash
# Собрать образ
make docker-build

# Запустить контейнер (порт 3080)
make docker-run

# Одной командой: собрать и запустить
make deploy

# Пересобрать работающий контейнер
make redeploy

# Посмотреть логи
make logs

# Остановить
make docker-stop
```

По умолчанию контейнер слушает на порту **3080**.

## Все команды Makefile

| Команда | Описание |
|---|---|
| `make dev` | Локальный dev-сервер |
| `make build` | Локальная сборка в `dist/` |
| `make docker-build` | Сборка Docker образа |
| `make docker-run` | Запуск контейнера |
| `make docker-stop` | Остановка и удаление контейнера |
| `make docker-restart` | Пересобрать + перезапустить |
| `make deploy` | Собрать образ и запустить |
| `make redeploy` | Остановить → собрать → запустить |
| `make logs` | Follow логи контейнера |
| `make clean` | Удалить `dist/`, `node_modules`, образ |

## Caddy (reverse proxy)

Шаблон конфига в `Caddyfile.template`. Вставить в основной `Caddyfile`, заменив домен:

```caddyfile
your-domain.example.com {
    reverse_proxy localhost:3080
    encode gzip zstd
}
```

## Структура проекта

```
src/
├── components/
│   ├── layout/        # Header, Footer, Section (fade-in wrapper)
│   ├── catalog/       # SearchBar, FilterTags, OpportunityCard
│   ├── knowledge/     # TermCard (аккордеон)
│   └── ui/            # Modal
├── pages/             # HomePage, CatalogPage, KnowledgePage, LinksPage, AboutPage
├── data/              # opportunities.ts, terms.ts, links.ts
├── hooks/             # useInView (IntersectionObserver), useFilter
└── types/             # index.ts — все интерфейсы и константы
```

## Дизайн

Тёмная тема в стиле задеплоенного сайта:

- **Фон:** `#0B0E1A` — тёмный navy
- **Акцент:** `#5272F2` — приглушённый синий
- **Шрифты:** Nunito (заголовки) + DM Sans (текст) — Google Fonts
- Три уровня глубины карточек: `canvas → layer → raised`
- Цветные полосы сверху карточек по типу возможности
- Адаптивная навигация: pill-кнопки на десктопе, drawer на мобилке

## Данные

Все данные — статические TypeScript-массивы в `src/data/`:

- **13 возможностей** — конкурсы, гранты, обучение, стажировки, форумы
- **12 терминов** — словарь понятий в сфере молодёжных программ
- **6 ссылок** — официальные порталы, сгруппированные по тематике

---

*Курс «Основы российской государственности», Тюменский государственный университет, 2026*
