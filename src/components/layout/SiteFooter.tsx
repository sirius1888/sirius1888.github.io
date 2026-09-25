import { localize, type Language } from '../../i18n';

import { ArrowUp } from 'lucide-react';
import { Link } from '../../ui-kit';
/** Copyright and the persistent return-to-top link. */
export function SiteFooter({ lang }: { lang: Language }) {
  const t = localize(lang);
  return (
    <>
      <footer className="footer wrap">
        <span>
          © {new Date().getFullYear()} {t('Sergei Karukes', 'Сергей Карукес')}
        </span>
      </footer>
      <Link className="back-to-top" href="#home">
        <ArrowUp size={18} aria-hidden="true" />
        {t('Back to top', 'Наверх')}
      </Link>
    </>
  );
}
