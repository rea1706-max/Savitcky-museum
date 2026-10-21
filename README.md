# Next.js

A modern Next.js 15 application built with TypeScript and Tailwind CSS.

## 🚀 Features

- **Next.js 15** - Latest version with improved performance and features
- **React 19** - Latest React version with enhanced capabilities
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

## 🛠️ Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:4028](http://localhost:4028) with your browser to see the result.

## 📁 Project Structure

```
nextjs/
├── public/             # Static assets
├── src/
│   ├── app/            # App router components
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Main page component
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and Tailwind configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration

```

## 🧩 Page Editing

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 🎨 Styling

This project uses Tailwind CSS for styling with the following features:

- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## Homepage collection journey / Переход коллекции на главной

The homepage uses one pinned horizontal GSAP timeline for **What’s On → Collection** on every
screen size, phones included (each panel has its own narrow layout). Between the two panels a
seam of diagonal charcoal, earth, clay and sand bands carries the eye out of the dark into the
ivory Collection. One pixel of scroll equals one pixel of sideways travel, so speed carries over
without a jolt. Page-wide smooth scrolling (Lenis, `src/components/SmoothScroll.tsx`) eases wheel
and trackpad input; touch keeps native momentum. Animations move only opacity and transforms —
no morphing `clip-path` polygons, which cut frames into shards mid-scroll.

**Karakalpak Arts** follows vertically: the ornament draws itself on the ivory as the section
rises, the textile opens out of its red knot, then the copy arrives; once the frame is held only
a slow settle of the cloth remains. Headings in this chapter, Collection and Museum Today are
sized from their own column (container query units), so the longest word in any of the four
languages stays on one line. The Karakalpak Arts CTA opens
`/collection?category=karakalpak-arts` with the catalogue filter active.

На главной один закреплённый горизонтальный GSAP-переход **What’s On → Collection** работает на
всех экранах, включая телефоны (у каждой панели своя узкая раскладка). Между панелями — «шов»
из диагональных полос угля, земли, глины и песка, который выводит взгляд из тёмного в светлую
Collection. Пиксель прокрутки равен пикселю горизонтального движения, поэтому скорость
переходит без рывка. Плавная прокрутка всей страницы (Lenis, `src/components/SmoothScroll.tsx`)
сглаживает колесо и тачпад; на сенсорных экранах остаётся нативная инерция. Анимируются только
прозрачность и трансформации — без морфинга `clip-path`-многоугольников, который резал кадры.

**Karakalpak Arts** идёт вертикально: орнамент прорисовывается на светлом фоне, пока раздел
поднимается, текстиль раскрывается из его красного узла, затем появляется текст; в удержанном
кадре остаётся только медленное «оседание» ткани. Заголовки этой главы, Collection и Museum
Today масштабируются от ширины своей колонки (container query units), поэтому самое длинное
слово на любом из четырёх языков не разрывается. CTA Karakalpak Arts открывает каталог с
активным фильтром `/collection?category=karakalpak-arts`.

## Language and identity / Язык и айдентика

The EN, RU, UZ, and KK controls translate the current view immediately on every route. The choice
is stored in a cookie and local storage, restored on the next visit, and falls back to the browser
language on a first visit. Dates, exhibition records, navigation, archive labels, accessibility
labels, and page-specific copy use the same locale. The official supplied Savitsky mark switches
between light- and dark-surface variants in the header, opening scene, footer, and browser icon.

Переключатели EN, RU, UZ и KK сразу переводят текущий экран на любом маршруте. Выбор сохраняется
в cookie и local storage, восстанавливается при следующем визите, а при первом открытии берётся из
языка браузера. Даты, карточки выставок, навигация, архивные подписи, доступные названия и тексты
страниц используют одну локаль. Официальный знак Савицкого автоматически меняет светлый и тёмный
варианты в шапке, вступительной сцене, футере и иконке браузера.

## Closing homepage sequence / Финал главной страницы

After Karakalpak Arts, the page continues vertically through Museum Today, the landscape
chapter “From Nukus to the World”, and a homepage-specific footer. Museum Today shows two
story teasers; its CTA and the main Stories navigation open the separate `/stories` archive.
The closing landscape uses the supplied production image at
`public/images/final/nukus-landscape.png`. Motion uses reversible ScrollTriggers without a
new pinned or horizontal section and respects reduced-motion preferences. The language controls
translate the full active page and preserve the selection between visits.

После Karakalpak Arts страница продолжается вертикально: Museum Today, пейзажный финал
«From Nukus to the World» и отдельный футер главной. В Museum Today показаны две истории;
его кнопка и пункт Stories в меню ведут в самостоятельный архив `/stories`. Финальный
пейзаж берётся из предоставленного изображения
`public/images/final/nukus-landscape.png`. Анимация обратима при прокрутке, не добавляет
нового закреплённого или горизонтального участка и учитывает настройку уменьшения движения.
Переключатель языка переводит всю активную страницу и сохраняет выбор между визитами.

## 📱 Deployment

Build the application for production:

```bash
npm run build
```

The production site runs as a standalone Next.js container behind Nginx at
`https://savitsky.87-192-248-137.sslip.io`. The server checks the private GitHub repository
with a read-only deploy key every 30 seconds and releases new commits from `main` automatically.
Manual releases use:

```bash
./scripts/deploy-server.sh
```

The script fast-forwards the server checkout, rebuilds the Docker image, restarts the service,
and verifies the local health endpoint before completing. The Nginx virtual host and systemd
unit templates live in `deploy/`. GitHub Actions also type-checks and production-builds every push
and pull request.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by Next.js and React
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
