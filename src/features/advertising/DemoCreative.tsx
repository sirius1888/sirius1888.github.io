import { ArrowUpRight, Sparkles } from 'lucide-react';
import { localize as local, type Language } from '../../i18n';
import { Button } from '../../ui-kit';
/** Reusable sample creative for banner and native placements. */
export function DemoCreative({
  lang,
  compact = false,
  onOpen,
}: {
  lang: Language;
  compact?: boolean;
  onOpen: () => void;
}) {
  const t = local(lang);
  return (
    <Button className={`demo-creative ${compact ? 'compact' : ''}`} onClick={onOpen}>
      <span className="creative-mark">
        <Sparkles size={compact ? 19 : 26} />
      </span>
      <span>
        <small>{t('AD · DEMO', 'РЕКЛАМА · ДЕМО')}</small>
        <strong>{t('Sample advertisement', 'Пример объявления')}</strong>
        <span>
          {t('View ad', 'Открыть объявление')}
          <ArrowUpRight size={11} />
        </span>
      </span>
    </Button>
  );
}
