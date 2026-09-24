export type Language = 'en' | 'ru';
export type Project = 'vinteo' | 'ug';
export type Demo = 'call' | 'chat' | 'pip' | 'viewer' | 'reconnect';
export const bi = (en: string, ru: string) => ({ en, ru });
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
export const demos: { id: Demo; title: ReturnType<typeof bi>; subtitle: ReturnType<typeof bi> }[] =
  [
    {
      id: 'chat',
      title: bi('Conference chat', 'Чат конференции'),
      subtitle: bi('Messages during a conference.', 'Сообщения во время конференции.'),
    },
    {
      id: 'pip',
      title: bi('Picture in Picture', 'Картинка в картинке'),
      subtitle: bi('Video in a floating iOS window.', 'Видео в плавающем окне iOS.'),
    },
    {
      id: 'viewer',
      title: bi('Viewer mode', 'Режим зрителя'),
      subtitle: bi('Watch without a microphone or camera.', 'Просмотр без микрофона и камеры.'),
    },
    {
      id: 'reconnect',
      title: bi('Reconnection', 'Переподключение'),
      subtitle: bi('Recover after a connection loss.', 'Восстановление после потери связи.'),
    },
  ];
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
    id: 'quality',
    title: bi('Architecture & quality', 'Архитектура и качество'),
    subtitle: bi('Architecture, quality & delivery', 'Архитектура, качество и выпуск'),
    items: [
      'Modular architecture',
      'Clean Architecture',
      'MVVM / MVP',
      'Platform adapters',
      'Jest',
      'React Native Testing Library',
      'Unit / E2E testing',
      'A/B testing',
      'ESLint',
      'Gradle',
      'Xcode',
      'Git',
      'Code review',
      'Release management',
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
export const experience = [
  {
    company: 'Vinteo',
    period: bi('Sep 2024 — present', 'Сентябрь 2024 — настоящее время'),
    role: bi('Team Lead React Native Engineer', 'Team Lead React Native Engineer'),
    body: bi(
      'Senior → Team Lead since October 2025. Mobile conferencing, native integrations and a team with two developers, two QA engineers and a PM, in addition to myself.',
      'Senior → Team Lead с октября 2025. Мобильные видеоконференции, нативные интеграции и команда: два разработчика, два тестировщика и PM, помимо меня.',
    ),
    current: true,
  },
  {
    company: 'Muse Group',
    period: bi('May 2021 — Sep 2024', 'Май 2021 — сентябрь 2024'),
    role: bi('React Native Developer', 'React Native Developer'),
    body: bi(
      'Ultimate Guitar and MuseScore. Advertising architecture, reusable integrations, analytics and experiments. Collaboration with international teams and SDK vendors.',
      'Ultimate Guitar и MuseScore. Рекламная архитектура, переиспользуемые интеграции, аналитика и эксперименты. Работа с международными командами и поставщиками SDK.',
    ),
  },
  {
    company: 'O!',
    period: bi('Dec 2019 — Jun 2021', 'Декабрь 2019 — июнь 2021'),
    role: bi('Android / iOS Developer', 'Android / iOS Developer'),
    body: bi(
      'Payment app: redesigned screens and UI components, optimized screen loading, and participated in the migration to MVVM. Started developing for iOS in Swift and implemented the same features on Android and iOS.',
      'Платёжное приложение: редизайн экранов и UI-компонентов, оптимизация загрузки экранов, участие в переходе на MVVM. Здесь начал разрабатывать под iOS на Swift и реализовывал одни и те же функции на Android и iOS.',
    ),
  },
];
export const earlier = [
  {
    company: 'Inobi',
    role: 'Android Developer',
    period: '2019',
    desc: bi(
      'Olympic Council of Asia project · MVVM, MVP and Google Play release.',
      'Проект Olympic Council of Asia · MVVM, MVP и публикация в Google Play.',
    ),
  },
  {
    company: 'TimelySoft',
    role: 'Junior Android Developer',
    period: '2018 — 2019',
    desc: bi(
      'Warehouse app · Offline-first synchronization and barcode scanning.',
      'Складское приложение · Офлайн-синхронизация и сканирование штрихкодов.',
    ),
  },
  {
    company: 'CS-Soft',
    role: 'Intern / Junior Android Developer',
    period: '2018',
    desc: bi(
      'Maintained and improved a legacy Android application.',
      'Поддержка и развитие существующего Android-приложения.',
    ),
  },
];
