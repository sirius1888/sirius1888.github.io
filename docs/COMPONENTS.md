# Компоненты и архитектура

Страница собирается в [App.tsx](../src/App.tsx). Разделы владеют своими сценариями, хуки — состоянием и жизненным циклом, UI kit — повторяющимися элементами интерфейса. Передача зависимостей идёт через типизированные props и callbacks.

```text
src/
  App.tsx                 сборка страницы
  ui-kit/                 общие элементы и их контракты
  components/layout/      навигация и подвал
  components/shared/      общие для страницы контакты
  features/
    profile/              представление и навыки
    vinteo/               текущая роль и звонок
    advertising/          рекламные конфигурации и показы
    experience/           предыдущие роли
    contact/              связь и резюме
  hooks/                  настройки страницы
  services/               адаптер хранилища
  data/                   контактные адреса
  content.ts              содержание портфолио
  i18n.ts                 типы языков и выбор текста
  typography.ts           правила неразрывных пробелов
```

## SOLID в этой структуре

| Принцип                             | Применение                                                                                                                                                                                                                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S — одна ответственность**        | `App` собирает страницу; `ChatPanel` отображает форму и сообщения; `useConferenceCall` управляет звонком; `AdOverlay` показывает состояние рекламы, а `useAdPlacement` проверяет возможность награды и управляет таймерами.                                                         |
| **O — расширение через композицию** | `ChoiceGroup` принимает данные и функцию рендера опции; `DeviceFrame` — произвольное приложение; `ListRow`, `MessageBubble` и заголовки — содержимое через слоты. Новый вариант не требует ветки с названием продукта в UI kit.                                                     |
| **L — сохранение контрактов**       | `Button` и `Link` сохраняют нативные элементы, события и refs. Отключённая кнопка не вызывает действие, `download` остаётся скачиванием, submit задаётся явно. Управляемые компоненты не присваивают себе состояние родителя.                                                       |
| **I — небольшие интерфейсы**        | `AdOverlay` получает SDK, адаптер и состояние показа; `MusicAppScreen` — только нужные признаки и действия; `CallParticipants` не получает весь контроллер звонка. `AdShowcaseControls` умеет запрашивать изменение consent, а не менять произвольную часть рекламной конфигурации. |
| **D — зависимости через контракты** | `usePreferences` принимает `PreferenceStore`; браузерный `localStorage` находится в адаптере. Представления получают действия через callbacks. UI kit не импортирует бизнес-модули, переводы или данные портфолио.                                                                  |

Композиция функциональных React-компонентов заменяет иерархию наследования. Классы, контейнер внедрения зависимостей и универсальные контроллеры для этой страницы не нужны.

## UI kit

Для каждого из 13 общих компонентов описаны назначение, props, ограничения и поведение в [каталоге UI kit](../src/ui-kit/README.md). Все компоненты и хуки имеют краткие JSDoc-описания рядом с реализацией.

## Компоненты страницы

| Компонент                                                                | Входные данные и ответственность                                                                                                           | Владелец состояния                                                                 |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [App](../src/App.tsx)                                                    | Без props; собирает навигацию, пять разделов и подвал.                                                                                     | Подключает `usePreferences`; состояния демо здесь нет.                             |
| [SiteHeader](../src/components/layout/SiteHeader.tsx)                    | `lang`, `theme`, `onToggleLanguage`, `onToggleTheme`; навигация, кнопки языка и темы.                                                      | Локально хранит только открытие мобильного меню.                                   |
| [SiteFooter](../src/components/layout/SiteFooter.tsx)                    | `lang`; подпись и ссылка возврата наверх.                                                                                                  | Нет.                                                                               |
| [SocialLinks](../src/components/shared/SocialLinks.tsx)                  | `lang`; единый набор GitHub, LinkedIn, Telegram и email.                                                                                   | Нет; адреса — в `data/contacts.ts`.                                                |
| [ProfileHero](../src/features/profile/ProfileHero.tsx)                   | `lang`; фотография, представление, резюме и ссылки на проекты.                                                                             | Нет.                                                                               |
| [SkillsPanel](../src/features/profile/SkillsPanel.tsx)                   | `lang`; все категории навыков и показатели опыта.                                                                                          | Нет; читает `skillGroups`.                                                         |
| [SkillIcon](../src/features/profile/SkillIcon.tsx)                       | `name`; выбирает логотип или символ навыка и монохромное оформление.                                                                       | Нет.                                                                               |
| [VinteoSection](../src/features/vinteo/VinteoSection.tsx)                | `lang`; заголовок работодателя, описание лидерства и демо.                                                                                 | Нет.                                                                               |
| [LeadershipSummary](../src/features/vinteo/LeadershipSummary.tsx)        | `lang`; состав команды, задачи и процессы.                                                                                                 | Нет.                                                                               |
| [ConferenceShowcase](../src/features/vinteo/ConferenceShowcase.tsx)      | `lang`; выбор функции, рамка устройства и мобильный переход к демо.                                                                        | `useConferenceScenario`.                                                           |
| [VinteoScene](../src/features/vinteo/VinteoScene.tsx)                    | `lang`, `demo`, `onDemo`; собирает участников, действия, чат, PiP и состояния звонка.                                                      | `useConferenceCall`; сценарий принадлежит родителю.                                |
| [CallParticipants](../src/features/vinteo/CallParticipants.tsx)          | `lang`, `mic`, `camera`, `viewer`, `reconnecting`; плитки и индикаторы участников.                                                         | Нет.                                                                               |
| [CallControls](../src/features/vinteo/CallControls.tsx)                  | Признаки камеры, микрофона и зрителя; callbacks камеры, микрофона, чата и завершения.                                                      | Нет; только передаёт действия владельцу звонка.                                    |
| [ChatPanel](../src/features/vinteo/ChatPanel.tsx)                        | `lang`, `messages`, `draft`, `onDraftChange`, `onSend`, `onClose`; форма и история сообщений.                                              | Только DOM-ref для прокрутки. Черновик и сообщения находятся в контроллере звонка. |
| [PictureInPicture](../src/features/vinteo/PictureInPicture.tsx)          | `lang`, `onClose`; визуальный сценарий PiP и возврат к звонку.                                                                             | Нет; системный PiP не вызывается.                                                  |
| [MuseSection](../src/features/advertising/MuseSection.tsx)               | `lang`; рассказ о работе, схема и рекламное демо.                                                                                          | `useAdConfiguration` связывает конфигурацию двух представлений.                    |
| [AdsArchitecture](../src/features/advertising/AdsArchitecture.tsx)       | `lang`, конфигурация SDK/адаптера/аналитики/экспериментов, `events`, `onChange`, `onReset`; интерактивная схема.                           | Нет.                                                                               |
| [AdShowcase](../src/features/advertising/AdShowcase.tsx)                 | `lang`, конфигурация показа, `onChange`, `onEvent`, `resetVersion`; соединяет выбор формата, телефон и рекламный экран.                    | `useAdPlacement`.                                                                  |
| [AdShowcaseControls](../src/features/advertising/AdShowcaseControls.tsx) | Конфигурация показа, `app`, `format`, `onAppChange`, `onFormatChange`, `onConsentChange`, `lang`; управляемые элементы выбора.             | Нет.                                                                               |
| [MusicAppScreen](../src/features/advertising/MusicAppScreen.tsx)         | `lang`, `app`, `format`, `consent`, `claimed`, `onShowAd`, `onOpenCreative`, `overlayContent`; реконструкция библиотеки и рекламные места. | Нет.                                                                               |
| [DemoCreative](../src/features/advertising/DemoCreative.tsx)             | `lang`, `compact`, `onOpen`; одно объявление для баннерного и нативного размещения.                                                        | Нет.                                                                               |
| [AdOverlay](../src/features/advertising/AdOverlay.tsx)                   | `lang`, вид и фаза показа, секунды, SDK/адаптер, `onDismiss`, `onClaim`; полноэкранное объявление внутри телефона.                         | Только ref начального фокуса. Награду проверяет контроллер.                        |
| [ExperienceSection](../src/features/experience/ExperienceSection.tsx)    | `lang`; хронология предыдущей работы.                                                                                                      | Нет; читает `earlier`.                                                             |
| [ExperienceItem](../src/features/experience/ExperienceItem.tsx)          | `lang`, `item: ExperienceEntry`; даты, работодатель и задачи одной роли.                                                                   | Нет. Тип требует либо список задач, либо описание.                                 |
| [ContactSection](../src/features/contact/ContactSection.tsx)             | `lang`; способы связи и обе версии резюме.                                                                                                 | Нет.                                                                               |

## Хуки и внешние зависимости

| Модуль                                                                   | Контракт и гарантии                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [usePreferences](../src/hooks/usePreferences.ts)                         | Принимает `PreferenceStore`, возвращает `lang`, `theme`, `toggleLanguage`, `toggleTheme`. Начальные значения EN/dark одинаковы для SSR и первого клиентского рендера. Чтение выполняется после монтирования; ошибка хранилища не отключает управление. Синхронизирует язык документа, тему и заголовок. |
| [PreferenceStore](../src/services/preferences.ts)                        | `read(): Partial<Preferences>`, `write(preferences): void`. `browserPreferenceStore` использует прежние ключи localStorage. В тестах подставляется адаптер в памяти.                                                                                                                                    |
| [useConferenceScenario](../src/features/vinteo/useConferenceScenario.ts) | Возвращает сценарий, `setDemo`, `selectScenario` и ref области демо. Повторный выбор выключает сценарий. На мобильной ширине фокусирует область, не поле ввода. Escape возвращает обычный звонок.                                                                                                       |
| [useConferenceCall](../src/features/vinteo/useConferenceCall.ts)         | Принимает `demo`, `onDemo`; управляет камерой, микрофоном, завершением, черновиком и историей. Очищает таймер переподключения при смене сценария и размонтировании.                                                                                                                                     |
| [useAdConfiguration](../src/features/advertising/useAdConfiguration.ts)  | Возвращает `config`, `events`, `resetVersion`, `update`, `emit`, `reset`. Reducer атомарно обновляет конфигурацию и журнал. Отключение аналитики очищает журнал и останавливает запись; журнал ограничен 30 событиями.                                                                                  |
| [useAdPlacement](../src/features/advertising/useAdPlacement.ts)          | Принимает `consent`, `resetVersion`, `onEvent`. Управляет приложением, форматом, экраном объявления и наградой. Смена приложения/формата, сброс и отзыв consent очищают показ. Нельзя забрать награду до завершения. Таймеры очищаются при отмене и размонтировании.                                    |
| [useEscapeKey](../src/ui-kit/useEscapeKey.ts)                            | Подписка на необработанный Escape с обязательной отпиской.                                                                                                                                                                                                                                              |

## Проверки и изменение кода

- `src/App.test.tsx` проверяет пользовательские сценарии, гидратацию, язык, тему и работу без storage.
- Тесты UI kit проверяют клавиатуру, `disabled`, форму, refs, управляемые значения, ссылки и возврат фокуса.
- Тесты контроллеров проверяют границы аналитики, согласие, доступность награды и отмену таймеров.
- `src/architecture.test.ts` проверяет границу зависимостей UI kit.
- TypeScript работает в строгом режиме и запрещает неиспользуемые импорты, переменные и параметры.

При изменении внешнего вида обновляются стили соответствующего слоя. При добавлении поведения сначала определяется владелец состояния, затем представлению передаётся нужный callback. Новые компоненты добавляются в этот каталог, общие — также в каталог UI kit.
