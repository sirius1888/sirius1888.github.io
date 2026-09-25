# Sergei Karukes — Portfolio

**[sirius1888.github.io](https://sirius1888.github.io/)**

Я разрабатываю мобильные приложения для iOS и Android и руковожу командой в Vinteo. Здесь собрал свой опыт, технологии, с которыми работаю, и примеры задач из проектов.

- **Vinteo Mobile** — чаты конференций, Picture in Picture на iOS, режим зрителя и переподключение.
- **Muse Group** — общий рекламный модуль для Ultimate Guitar и MuseScore: сменные SDK и адаптеры, аналитика, эксперименты и рекламные форматы.
- **Предыдущий опыт** — O!, Inobi, TimelySoft и CS-Soft.

Для демонстраций в телефонах воссоздал отдельные сценарии с тестовыми данными. На сайте можно переключить язык и тему, посмотреть мой стек и скачать резюме на английском или русском.

## Стек сайта

React · TypeScript · Vite · CSS. Тесты — Vitest и React Testing Library.

Шрифты — Inter и Geist Mono. Иконки — [Lucide](https://lucide.dev/), [Devicon](https://devicon.dev/) и [Simple Icons](https://simpleicons.org/); логотип RuStore — с [официального сайта](https://www.rustore.ru/). Дизайн-система описана в [DESIGN.md](./DESIGN.md).

Общие компоненты собрал в [UI kit](./src/ui-kit/README.md). Их API, структуру разделов и применение SOLID описал в [документации компонентов](./docs/COMPONENTS.md).

## Локальный запуск

Версия Node.js указана в `.nvmrc`.

```sh
nvm use
npm ci
npm run dev
```

Сайт откроется на [localhost:5173](http://localhost:5173/).

## Проверка и сборка

```sh
npm test
npm run format:check
npm run build
npm run preview
```

Сборка включает проверку TypeScript и предварительный рендер страницы в HTML. Готовый сайт находится в `dist/`, предпросмотр — на [localhost:4173](http://localhost:4173/).

## Публикация

После push в `main` GitHub Actions запускает проверки, собирает сайт и публикует его на GitHub Pages. Workflow также можно запустить вручную во вкладке Actions.

## Контакты

[Telegram](https://t.me/ser1888) · [LinkedIn](https://www.linkedin.com/in/sirius1888/) · [Email](mailto:ser1888kg@gmail.com)
