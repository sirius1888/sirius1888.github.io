import { localize, type Language } from '../../i18n';

import { ArrowUp, ArrowUpRight, Check, Play } from 'lucide-react';
import { projects } from '../../content';
import { ChoiceGroup, DeviceFrame, Link, ProductLabel } from '../../ui-kit';
import { VinteoScene } from './VinteoScene';
import { scenarios } from './scenarios';
import { useConferenceScenario } from './useConferenceScenario';
/** Conference feature selection, mobile handoff and the device preview. */
export function ConferenceShowcase({ lang }: { lang: Language }) {
  const t = localize(lang);
  const { demo, setDemo, demoStage, selectScenario } = useConferenceScenario();
  return (
    <div className="vinteo-product" id="vinteo-mobile" data-reveal>
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
        <ChoiceGroup
          className="scenario-list"
          id="conference-scenarios"
          controls="conference-demo"
          label={t('Conference demo scenarios', 'Сценарии демо конференции')}
          value={demo}
          options={scenarios.map((item) => ({
            ...item,
            value: item.id,
            label: item.title[lang],
          }))}
          onValueChange={selectScenario}
          renderOption={(item, selected) => {
            const Icon = item.icon;
            return (
              <>
                <span className="scenario-icon">
                  <Icon size={20} />
                </span>
                <span>
                  <strong>{item.title[lang]}</strong>
                  <small>{item.description[lang]}</small>
                </span>
                {selected ? (
                  <Check size={18} aria-hidden="true" />
                ) : (
                  <Play size={16} aria-hidden="true" />
                )}
              </>
            );
          }}
        />
        <Link className="text-link" href={projects.vinteo.url} target="_blank" rel="noreferrer">
          Vinteo Mobile {t('on the App Store', 'в App Store')}
          <ArrowUpRight size={14} />
        </Link>
      </div>
      <div
        className="vinteo-phone-stage"
        id="conference-demo"
        ref={demoStage}
        tabIndex={-1}
        role="region"
        aria-label={t('Interactive conference demo', 'Интерактивное демо конференции')}
      >
        <ProductLabel
          image="./images/vinteo.jpg"
          title="Vinteo Mobile"
          detail={t('INTERACTIVE DEMO', 'ИНТЕРАКТИВНОЕ ДЕМО')}
        />
        <DeviceFrame
          label={t('Vinteo Mobile in iPhone', 'Vinteo Mobile в iPhone')}
          className="vinteo-device"
        >
          <VinteoScene lang={lang} demo={demo} onDemo={setDemo} />
        </DeviceFrame>
        <p className="device-caption">
          {t(
            'Reconstructed interface · demo participants',
            'Реконструкция интерфейса · демо-участники',
          )}
        </p>
        <Link className="demo-return text-link" href="#conference-scenarios">
          <ArrowUp size={16} />
          {t('Choose another feature', 'Выбрать другую функцию')}
        </Link>
      </div>
    </div>
  );
}
