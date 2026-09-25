import type { ExperienceEntry } from './features/experience/model';
import { bi } from './i18n';

export const projects = {
  vinteo: {
    name: 'Vinteo Mobile',
    icon: './images/vinteo.jpg',
    company: 'Vinteo',
    period: bi('2024 — present', '2024 — настоящее время'),
    title: bi('Mobile video conferencing', 'Мобильные видеоконференции'),
    summary: bi(
      'I develop conference chats, iOS Picture in Picture, viewer mode and reconnection in Vinteo Mobile.',
      'Разрабатываю чаты конференций, Picture in Picture на iOS, режим зрителя и переподключение в Vinteo Mobile.',
    ),
    role: bi(
      'Senior → Team Lead React Native Engineer',
      'Senior → Team Lead React Native Engineer',
    ),
    focus: bi(
      'Real-time communication · Native integrations',
      'Коммуникации в реальном времени · Нативные интеграции',
    ),
    tags: ['React Native', 'TypeScript', 'WebRTC', 'iOS / Android'],
    url: 'https://apps.apple.com/ru/app/vinteo/id1582762458',
    contributions: [
      bi('Built conference chats and viewer mode.', 'Реализовал чаты конференций и режим зрителя.'),
      bi('Implemented Picture in Picture on iOS.', 'Реализовал Picture in Picture на iOS.'),
      bi(
        'Worked on reconnection and refactored call logic and components.',
        'Разработал переподключение и проводил рефакторинг логики звонков и компонентов.',
      ),
    ],
  },
  ug: {
    name: 'Ultimate Guitar',
    icon: './images/ultimate-guitar.jpg',
    company: 'Muse Group',
    period: bi('2021 — 2024', '2021 — 2024'),
    title: bi('Reusable advertising module', 'Общий рекламный модуль'),
    summary: bi(
      'I built an advertising module reused in Ultimate Guitar and MuseScore. Replaceable SDKs and adapters allowed experiments with different integrations without dependence on one vendor.',
      'Создал рекламный модуль, переиспользуемый в Ultimate Guitar и MuseScore. Сменные SDK и адаптеры позволяли проводить эксперименты с разными интеграциями без привязки к одному вендору.',
    ),
    role: bi(
      'React Native Developer · Advertising Department',
      'React Native Developer · Рекламный департамент',
    ),
    focus: bi(
      'Reusable architecture · Advertising · Experiments',
      'Переиспользуемая архитектура · Реклама · Эксперименты',
    ),
    tags: ['React Native', 'Native SDKs', 'Analytics', 'Experiments'],
    url: 'https://apps.apple.com/ru/app/ultimate-guitar-chords-tabs/id357828853',
    contributions: [
      bi(
        'Designed replaceable advertising SDK and adapter integrations.',
        'Создавал интеграции со сменными рекламными SDK и адаптерами.',
      ),
      bi(
        'Wrote independent analytics and experiment modules from scratch.',
        'С нуля написал независимые модули аналитики и экспериментов.',
      ),
      bi(
        'Optimized screens with ads and worked on consent and regional requirements.',
        'Оптимизировал экраны с рекламой, работал с consent и региональными требованиями.',
      ),
    ],
  },
};
export const skillGroups = [
  {
    id: 'mobile',
    title: bi('React Native & core', 'React Native и инструменты'),
    subtitle: bi('My everyday foundation', 'Основа моей работы'),
    items: [
      'React Native',
      'TypeScript',
      'JavaScript',
      'Redux Toolkit',
      'RTK Query',
      'React Navigation',
      'Reanimated',
      'Hermes',
    ],
  },
  {
    id: 'native',
    title: bi('Native & platform integrations', 'Нативная разработка и интеграции'),
    subtitle: bi('Native languages & integrations', 'Нативные языки и интеграции'),
    items: [
      'Swift',
      'Objective-C',
      'Kotlin',
      'Java',
      'iOS',
      'Android',
      'AIDL',
      'Android Services',
      'Broadcasts',
      'APNs / FCM',
      'VoIP Push',
      'iOS PiP',
      'Deep & universal links',
    ],
  },
  {
    id: 'systems',
    title: bi('Communication, data & security', 'Связь, данные и безопасность'),
    subtitle: bi('Communication, data & security', 'Связь, данные и безопасность'),
    items: [
      'WebRTC',
      'WebSocket',
      'REST',
      'Realm',
      'SQLite',
      'Room',
      'Offline-first',
      'OIDC / OAuth 2.0',
      'PKCE',
      'Keychain',
      'safeStorage',
      'Electron',
    ],
  },
  {
    id: 'architecture',
    title: bi('Architecture', 'Архитектура'),
    subtitle: bi('Application architecture', 'Архитектура приложений'),
    items: ['Modular architecture', 'Clean Architecture', 'MVVM / MVP', 'Platform adapters'],
  },
  {
    id: 'quality',
    title: bi('QA', 'QA'),
    subtitle: bi('Testing & code quality', 'Тестирование и качество кода'),
    items: [
      'Jest',
      'React Native Testing Library',
      'Unit / E2E testing',
      'A/B testing',
      'ESLint',
      'Code review',
    ],
  },
  {
    id: 'releases',
    title: bi('Release management', 'Управление релизами'),
    subtitle: bi('Builds & distribution', 'Сборки и публикация'),
    items: [
      'Gradle',
      'Xcode',
      'Git',
      'Alpha / Beta / Release',
      'Google Play',
      'App Store',
      'RuStore',
      'Huawei AppGallery',
    ],
  },
  {
    id: 'advertising',
    title: bi('Advertising SDKs & networks', 'Рекламные SDK и сети'),
    subtitle: bi('Advertising integrations', 'Рекламные интеграции'),
    items: [
      'AdMob',
      'Google Ad Manager',
      'AppLovin',
      'Unity Ads',
      'ironSource',
      'Meta Audience Network',
      'Mintegral',
      'Liftoff Monetize (Vungle)',
      'Pangle',
      'InMobi',
    ],
  },
];
export const earlier: readonly ExperienceEntry[] = [
  {
    company: 'O!',
    role: 'Middle Android / iOS Developer',
    period: bi('Dec\u00a02019 — Jun\u00a02021', 'Декабрь\u00a02019 — июнь\u00a02021'),
    duration: bi('1 year 7 months', '1 год 7 месяцев'),
    project: bi('My O! · Payment app', 'Мой О! · Платёжное приложение'),
    location: bi('Bishkek', 'Бишкек'),
    contributions: [
      bi(
        'Developed new features for Android and iOS. Started writing iOS code in Swift and implemented the same functionality on both platforms.',
        'Разрабатывал новый функционал для Android и iOS. Здесь начал писать под iOS на Swift и реализовывал одни и те же функции на обеих платформах.',
      ),
      bi(
        'Helped design the interfaces and redesigned payment history, profile creation and editing, and widgets.',
        'Участвовал в проектировании интерфейсов. Переработал историю платежей, создание и редактирование профиля, виджеты.',
      ),
      bi(
        'Refactored legacy code and participated in the migration to MVVM.',
        'Переписывал легаси-код и участвовал в переводе приложения на MVVM.',
      ),
      bi('Optimized screen loading.', 'Оптимизировал загрузку экранов.'),
      bi('Wrote unit tests.', 'Писал unit-тесты.'),
      bi(
        'Discussed requirements with managers and planned tasks using Agile/Scrum.',
        'Обсуждал ТЗ с менеджерами и планировал задачи по Agile/Scrum.',
      ),
    ],
  },
  {
    company: 'Inobi',
    role: 'Android Developer',
    period: bi('Apr\u00a02019 — Dec\u00a02019', 'Апрель\u00a02019 — декабрь\u00a02019'),
    duration: bi('9 months', '9 месяцев'),
    project: bi('Olympic Council of Asia', 'Olympic Council of Asia'),
    contributions: [
      bi(
        'Designed the application architecture and introduced MVVM.',
        'Проектировал архитектуру приложения и добавил поддержку MVVM.',
      ),
      bi('Contributed to the interface design.', 'Участвовал в проектировании интерфейсов.'),
      bi(
        'Built the first working version of the app (MVP).',
        'Подготовил первую рабочую версию приложения (MVP).',
      ),
      bi('Published the app on Google Play.', 'Опубликовал приложение в Google Play.'),
    ],
  },
  {
    company: 'TimelySoft',
    role: 'Junior Android Developer',
    period: bi('Sep\u00a02018 — Apr\u00a02019', 'Сентябрь\u00a02018 — апрель\u00a02019'),
    duration: bi('8 months', '8 месяцев'),
    project: bi(
      'Imperia Pizza · Warehouse management app',
      'Imperia Pizza · Приложение складского учёта',
    ),
    location: bi('Bishkek', 'Бишкек'),
    contributions: [
      bi(
        'Designed the application architecture using MVP (Model–View–Presenter).',
        'Спроектировал архитектуру приложения по шаблону MVP (Model–View–Presenter).',
      ),
      bi(
        'Built the first working version of the app.',
        'Подготовил первую рабочую версию приложения.',
      ),
      bi('Tested the app on site.', 'Тестировал приложение на производстве.'),
      bi(
        'Integrated QR code and barcode scanners.',
        'Реализовал поддержку сканеров QR-кодов и штрихкодов.',
      ),
      bi(
        'Implemented local data storage and offline operation, with synchronization when a stable internet connection became available.',
        'Реализовал работу с локальными данными и офлайн-режим с отправкой накопленных данных при восстановлении стабильного соединения.',
      ),
    ],
  },
  {
    company: 'CS-Soft',
    role: 'Intern / Junior Android Developer',
    period: bi('Mar\u00a02018 — Aug\u00a02018', 'Март\u00a02018 — август\u00a02018'),
    duration: bi('6 months', '6 месяцев'),
    location: bi('Bishkek', 'Бишкек'),
    desc: bi(
      'Maintained and improved a legacy Android application.',
      'Поддержка и развитие существующего Android-приложения.',
    ),
  },
];
