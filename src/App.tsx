import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  ClipboardList,
  Code2,
  Download,
  Eye,
  Menu,
  MessageCircle,
  Moon,
  PictureInPicture2,
  Play,
  Send,
  Sun,
  TestTube2,
  Users,
  Wifi,
  X,
} from 'lucide-react';
import { ProfileHero, SocialLinks, contactLinks } from './components/Profile';
import { IPhone, VinteoScene } from './components/Phone';
import {
  AdsArchitecture,
  AdShowcase,
  initialAdConfig,
  type AdConfig,
} from './components/Advertising';
import { bi, earlier, localize, projects, type Demo, type Language } from './content';

const scenarios = [
  {
    id: 'chat' as Demo,
    icon: MessageCircle,
    title: bi('Conference chat', 'Чат конференции'),
    description: bi(
      'Messages between conference participants.',
      'Сообщения между участниками конференции.',
    ),
  },
  {
    id: 'pip' as Demo,
    icon: PictureInPicture2,
    title: bi('Picture in Picture', 'Картинка в картинке'),
    description: bi('Video calls in a floating iOS window.', 'Видеозвонок в плавающем окне iOS.'),
  },
  {
    id: 'viewer' as Demo,
    icon: Eye,
    title: bi('Viewer mode', 'Режим зрителя'),
    description: bi(
      'Watch without access to a microphone or camera.',
      'Просмотр без доступа к микрофону и камере.',
    ),
  },
  {
    id: 'reconnect' as Demo,
    icon: Wifi,
    title: bi('Reconnection', 'Переподключение'),
    description: bi('Recover after a connection loss.', 'Восстановление после потери связи.'),
  },
];
export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [demo, setDemo] = useState<Demo>('call');
  const demoStage = useRef<HTMLDivElement>(null);
  const [adConfig, setAdConfig] = useState<AdConfig>(initialAdConfig);
  const [adEvents, setAdEvents] = useState<string[]>([]);
  const [adResetVersion, setAdResetVersion] = useState(0);
  const t = localize(lang);
  useEffect(() => {
    try {
      if (localStorage.getItem('sk-language') === 'ru') setLang('ru');
      if (localStorage.getItem('sk-theme') === 'light') setTheme('light');
    } catch {}
    setPreferencesLoaded(true);
  }, []);
  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
    document.title =
      lang === 'en'
        ? 'Sergei Karukes — Senior / Lead React Native Engineer'
        : 'Сергей Карукес — Senior / Lead React Native Engineer';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafafa');
    try {
      localStorage.setItem('sk-language', lang);
      localStorage.setItem('sk-theme', theme);
    } catch {}
  }, [lang, theme, preferencesLoaded]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setDemo('call');
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, []);
  const emitAdEvent = useCallback(
    (event: string) => {
      if (adConfig.analytics) setAdEvents((events) => [...events, event].slice(-30));
    },
    [adConfig.analytics],
  );
  function updateAdConfig(patch: Partial<AdConfig>, event: string) {
    setAdConfig((config) => ({ ...config, ...patch }));
    if (patch.analytics === false) setAdEvents([]);
    else if (adConfig.analytics || patch.analytics === true)
      setAdEvents((events) => [...events, event].slice(-30));
  }
  function resetAds() {
    setAdConfig({ ...initialAdConfig });
    setAdEvents([]);
    setAdResetVersion((value) => value + 1);
  }
  const navigation = [
    ['home', t('About', 'Обо мне')],
    ['vinteo', 'Vinteo'],
    ['muse-group', 'Muse Group'],
    ['experience', t('Earlier work', 'Ранний опыт')],
  ];
  function selectScenario(next: Demo) {
    setDemo(demo === next ? 'call' : next);
    if (window.matchMedia('(max-width: 800px)').matches) {
      // Focus the demo region, never its input: opening a scene must not open the keyboard.
      demoStage.current?.focus({ preventScroll: true });
      demoStage.current?.scrollIntoView({ block: 'start' });
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        {t('Skip to content', 'Перейти к содержимому')}
      </a>
      <header className="header wrap">
        <a
          className="wordmark"
          href="#home"
          aria-label={t('Sergei Karukes, home', 'Сергей Карукес, начало')}
        >
          sk
        </a>
        <nav aria-label={t('Main navigation', 'Основная навигация')}>
          {navigation.map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language"
            aria-label={t('Switch to Russian', 'Переключить на английский')}
            onClick={() => setLang((value) => (value === 'en' ? 'ru' : 'en'))}
          >
            <span className={lang === 'en' ? 'current' : ''}>EN</span>
            <span>/</span>
            <span className={lang === 'ru' ? 'current' : ''}>RU</span>
          </button>
          <button
            className="icon-button"
            aria-label={t(
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
              theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему',
            )}
            onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            className="header-contact"
            href={contactLinks.telegram}
            target="_blank"
            rel="noreferrer"
          >
            {t('Contact', 'Связаться')}
            <ArrowUpRight size={15} />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={t(
              menuOpen ? 'Close navigation' : 'Open navigation',
              menuOpen ? 'Закрыть меню' : 'Открыть меню',
            )}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          hidden={!menuOpen}
          aria-label={t('Mobile navigation', 'Мобильная навигация')}
        >
          {navigation.map(([id, label]) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowDown size={16} />
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            {t('Contact', 'Контакты')}
            <ArrowDown size={16} />
          </a>
        </nav>
      </header>
      <main id="main">
        <ProfileHero lang={lang} />
        <section
          className="employer-section wrap vinteo-chapter"
          id="vinteo"
          aria-labelledby="vinteo-heading"
        >
          <div className="chapter-overline">
            <span className="section-index">02 / {t('CURRENT ROLE', 'ТЕКУЩАЯ РАБОТА')}</span>
            <span className="current-badge">
              <span />
              {t('SEP 2024 — PRESENT', 'СЕНТЯБРЬ 2024 — СЕЙЧАС')}
            </span>
          </div>
          <div className="employer-heading">
            <div className="employer-name">
              <span className="employer-brand vinteo-brand">
                <img src="./images/vinteo.jpg" alt="" />
              </span>
              <h2 id="vinteo-heading">Vinteo</h2>
            </div>
            <div className="employer-position">
              <strong>Team Lead React Native Engineer</strong>
              <span>
                {t('Senior → Team Lead since October 2025', 'Senior → Team Lead с октября 2025')}
              </span>
            </div>
          </div>
          <div className="leadership-layout">
            <div className="leadership-intro">
              <span className="case-kicker">{t('MY RESPONSIBILITIES', 'МОИ ЗАДАЧИ')}</span>
              <h3>{t('Development and team leadership', 'Разработка и руководство командой')}</h3>
              <p>
                {t(
                  'I develop Vinteo Mobile and coordinate development, testing and planning with the team. I introduced daily meetings, demos, Git conventions, documentation and testing practices.',
                  'Разрабатываю Vinteo Mobile и координирую разработку, тестирование и планирование в команде. Ввёл daily, demo, Git-соглашения, работу с документацией и тестами.',
                )}
              </p>
              <div
                className="team-composition"
                aria-label={t('Team composition excluding myself', 'Состав команды помимо меня')}
              >
                <div>
                  <Code2 size={19} />
                  <strong>2</strong>
                  <span>{t('developers', 'разработчика')}</span>
                </div>
                <div>
                  <TestTube2 size={19} />
                  <strong>2</strong>
                  <span>{t('QA engineers', 'тестировщика')}</span>
                </div>
                <div>
                  <ClipboardList size={19} />
                  <strong>1</strong>
                  <span>PM</span>
                </div>
              </div>
              <p className="team-scope">
                <Users size={14} />
                {t('Five colleagues, plus me as Team Lead.', 'Пять коллег и я в роли Team Lead.')}
              </p>
            </div>
            <div className="leadership-practices">
              {[
                [
                  bi('Agile', 'Agile'),
                  bi('Set up daily meetings and demos.', 'Организовал daily и demo.'),
                ],
                [
                  bi('Git workflow', 'Работа с Git'),
                  bi(
                    'Defined conventions for working together in Git.',
                    'Выстроил процесс совместной работы и Git-соглашения.',
                  ),
                ],
                [
                  bi('Documentation & tests', 'Документация и тесты'),
                  bi(
                    'Established documentation and testing practices.',
                    'Организовал ведение документации и работу с тестами.',
                  ),
                ],
                [
                  bi('Monorepo', 'Монорепозиторий'),
                  bi('Created a monorepo for the team.', 'Создал монорепозиторий для команды.'),
                ],
              ].map(([title, body], index) => (
                <div key={index}>
                  <span>0{index + 1}</span>
                  <div>
                    <h4>{title[lang]}</h4>
                    <p>{body[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="vinteo-product" id="vinteo-mobile">
            <div className="product-case-copy">
              <span className="case-kicker">
                {t('PRODUCT / VINTEO MOBILE', 'ПРОДУКТ / VINTEO MOBILE')}
              </span>
              <h3>{t('Video calls on iOS & Android', 'Видеосвязь на iOS и Android')}</h3>
              <p>
                {t(
                  'Conference chats, native iOS Picture in Picture, viewer mode and reconnection. My work also includes refactoring call logic and components.',
                  'Чаты конференций, нативный Picture in Picture на iOS, режим зрителя и переподключение. Также работаю над рефакторингом логики звонков и компонентов.',
                )}
              </p>
              <div className="case-tags">
                <span>React Native</span>
                <span>TypeScript</span>
                <span>WebRTC</span>
                <span>iOS / Android</span>
              </div>
              <p className="demo-instruction">
                {t(
                  'Choose a feature to try in the demo.',
                  'Выберите функцию, чтобы посмотреть её в демо.',
                )}
              </p>
              <div
                className="scenario-list"
                id="conference-scenarios"
                role="group"
                aria-label={t('Conference demo scenarios', 'Сценарии демо конференции')}
              >
                {scenarios.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      aria-pressed={demo === item.id}
                      aria-label={item.title[lang]}
                      aria-controls="conference-demo"
                      onClick={() => selectScenario(item.id)}
                    >
                      <span className="scenario-icon">
                        <Icon size={20} />
                      </span>
                      <span>
                        <strong>{item.title[lang]}</strong>
                        <small>{item.description[lang]}</small>
                      </span>
                      {demo === item.id ? (
                        <Check size={18} aria-hidden="true" />
                      ) : (
                        <Play size={16} aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
              <a className="text-link" href={projects.vinteo.url} target="_blank" rel="noreferrer">
                Vinteo Mobile {t('on the App Store', 'в App Store')}
                <ArrowUpRight size={14} />
              </a>
            </div>
            <div
              className="vinteo-phone-stage"
              id="conference-demo"
              ref={demoStage}
              tabIndex={-1}
              role="region"
              aria-label={t('Interactive conference demo', 'Интерактивное демо конференции')}
            >
              <div className="phone-stage-tag">
                <img src="./images/vinteo.jpg" alt="" />
                <span>Vinteo Mobile</span>
                <small>{t('INTERACTIVE DEMO', 'ИНТЕРАКТИВНОЕ ДЕМО')}</small>
              </div>
              <IPhone
                label={t('Vinteo Mobile in iPhone', 'Vinteo Mobile в iPhone')}
                className="vinteo-device"
              >
                <VinteoScene lang={lang} demo={demo} onDemo={setDemo} />
              </IPhone>
              <p className="device-caption">
                {t(
                  'Reconstructed interface · demo participants',
                  'Реконструкция интерфейса · демо-участники',
                )}
              </p>
              <a className="demo-return text-link" href="#conference-scenarios">
                <ArrowUp size={16} />
                {t('Choose another feature', 'Выбрать другую функцию')}
              </a>
            </div>
          </div>
        </section>
        <section
          className="employer-section wrap muse-chapter"
          id="muse-group"
          aria-labelledby="muse-heading"
        >
          <div className="chapter-overline">
            <span className="section-index">03 / {t('ADVERTISING', 'РЕКЛАМА')}</span>
            <span>{t('MAY 2021 — SEP 2024', 'МАЙ 2021 — СЕНТЯБРЬ 2024')}</span>
          </div>
          <div className="employer-heading">
            <div className="employer-name">
              <span className="employer-apps" aria-hidden="true">
                <img src="./images/ultimate-guitar.jpg" alt="" />
                <img src="./images/musescore.jpg" alt="" />
              </span>
              <h2 id="muse-heading">Muse Group</h2>
            </div>
            <div className="employer-position">
              <strong>React Native Developer</strong>
              <span>{t('Advertising Department', 'Рекламный департамент')}</span>
            </div>
          </div>
          <div className="muse-intro">
            <div>
              <span className="case-kicker">
                {t('ULTIMATE GUITAR + MUSESCORE', 'ULTIMATE GUITAR + MUSESCORE')}
              </span>
              <h3>{t('Reusable advertising module', 'Общий рекламный модуль')}</h3>
            </div>
            <div>
              <p>
                {t(
                  'I built an advertising module reused in Ultimate Guitar and MuseScore. Replaceable SDKs and adapters let the team test different integrations and avoid dependence on a single vendor.',
                  'Создал рекламный модуль, который переиспользовался в Ultimate Guitar и MuseScore. Сменные SDK и адаптеры позволяли проверять разные интеграции и не зависеть от одного вендора.',
                )}
              </p>
              <ul className="muse-contributions">
                <li>
                  <Check size={15} />
                  {t(
                    'Analytics and experiment modules written from scratch.',
                    'Модули аналитики и экспериментов, написанные с нуля.',
                  )}
                </li>
                <li>
                  <Check size={15} />
                  {t(
                    'Modules that can be connected and disconnected independently.',
                    'Независимое подключение и отключение модулей.',
                  )}
                </li>
                <li>
                  <Check size={15} />
                  {t(
                    'Ad screen optimization, consent and regional requirements.',
                    'Оптимизация экранов с рекламой, consent и региональные требования.',
                  )}
                </li>
              </ul>
            </div>
          </div>
          <AdsArchitecture
            lang={lang}
            config={adConfig}
            onChange={updateAdConfig}
            events={adEvents}
            onReset={resetAds}
          />
          <p className="architecture-footnote">
            {t(
              'A simplified interactive model of my work. GAM and ironSource are historical integration examples; SDK and adapter changes illustrate configuration choices. Consent work covered the EU, the US and other regions.',
              'Упрощённая интерактивная модель моей работы. GAM и ironSource — примеры интеграций того периода; смена SDK и адаптера иллюстрирует выбор конфигурации. Работа с consent учитывала требования ЕС, США и других регионов.',
            )}
          </p>
          <AdShowcase
            lang={lang}
            config={adConfig}
            onChange={updateAdConfig}
            onEvent={emitAdEvent}
            resetVersion={adResetVersion}
          />
        </section>
        <section className="earlier-section wrap" id="experience" aria-labelledby="earlier-title">
          <div className="chapter-overline">
            <span className="section-index">04 / {t('EARLIER EXPERIENCE', 'ПРЕДЫДУЩИЙ ОПЫТ')}</span>
            <span>2018 — 2021</span>
          </div>
          <div className="earlier-heading">
            <h2 id="earlier-title">
              {t('Android & iOS', 'Разработка')}
              <br />
              <span>{t('development', 'под Android и iOS')}</span>
            </h2>
            <p>
              {t(
                'Before Muse Group, I worked on payment, warehouse and sports applications.',
                'До Muse Group работал над платёжным и складским приложениями, а также проектом для Olympic Council of Asia.',
              )}
            </p>
          </div>
          <div className="previous-jobs">
            <article className="previous-job o-job">
              <div className="previous-period">
                {t('DEC 2019 — JUN 2021', 'ДЕКАБРЬ 2019 — ИЮНЬ 2021')}
              </div>
              <div className="previous-company">
                <h3>O!</h3>
                <span>Android / iOS Developer</span>
                <small>{t('My O! · Payment application', 'Мой О! · Платёжное приложение')}</small>
              </div>
              <ul>
                <li>
                  {t(
                    'Started developing for iOS in Swift and implemented the same features on Android and iOS.',
                    'Здесь начал разрабатывать под iOS на Swift и реализовывал одни и те же функции на Android и iOS.',
                  )}
                </li>
                <li>
                  {t('Redesigned screens and UI components.', 'Редизайн экранов и UI-компонентов.')}
                </li>
                <li>{t('Optimized screen loading.', 'Оптимизация загрузки экранов.')}</li>
                <li>
                  {t('Participated in the migration to MVVM.', 'Участие в переходе на MVVM.')}
                </li>
              </ul>
            </article>
            {earlier.map((item) => (
              <article className="previous-job" key={item.company}>
                <div className="previous-period">{item.period}</div>
                <div className="previous-company">
                  <h3>{item.company}</h3>
                  <span>{item.role}</span>
                </div>
                <p>{item.desc[lang]}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="contact-section wrap" id="contact" aria-labelledby="contact-title">
          <div className="contact-top">
            <span className="section-index">05 / {t('CONTACT', 'КОНТАКТЫ')}</span>
            <span>Senior / Lead React Native</span>
          </div>
          <h2 id="contact-title">{t('Get in touch', 'Связаться')}</h2>
          <div className="contact-bottom">
            <div>
              <p>
                {t(
                  'For work enquiries, reach me on Telegram or by email.',
                  'По вопросам работы — в Telegram или на почту.',
                )}
              </p>
              <a
                className="button button-accent"
                href={contactLinks.telegram}
                target="_blank"
                rel="noreferrer"
              >
                {t('Message on Telegram', 'Написать в Telegram')}
                <Send size={17} />
              </a>
            </div>
            <div>
              <SocialLinks lang={lang} />
              <div className="footer-cv">
                <Download size={14} />
                <span>{t('Resume', 'Резюме')}</span>
                <a href="./cv/Sergei_Karukes_EN.pdf" download>
                  English PDF
                </a>
                <span>/</span>
                <a href="./cv/Sergei_Karukes_RU.pdf" download>
                  Русский PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <span>
          © {new Date().getFullYear()} {t('Sergei Karukes', 'Сергей Карукес')}
        </span>
      </footer>
      <a className="back-to-top" href="#home">
        <ArrowUp size={18} aria-hidden="true" />
        {t('Back to top', 'Наверх')}
      </a>
    </>
  );
}
