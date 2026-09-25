import { localize, type Language } from '../../i18n';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from '../../ui-kit';
/** Copyright and a return-to-top link shown after scrolling past the first screen. */
export function SiteFooter({ lang }: { lang: Language }) {
  const t = localize(lang);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY >= window.innerHeight);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <>
      <footer className="footer wrap">
        <span>
          © {new Date().getFullYear()} {t('Sergei Karukes', 'Сергей Карукес')}
        </span>
      </footer>
      <Link className="back-to-top" href="#home" hidden={!showBackToTop}>
        <ArrowUp size={18} aria-hidden="true" />
        {t('Back to top', 'Наверх')}
      </Link>
    </>
  );
}
