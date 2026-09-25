import { localize, type Language } from '../../i18n';

import { ArrowDown, ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { contactLinks } from '../../data/contacts';
import type { Theme } from '../../services/preferences';
import { Button, IconButton, Link, useEscapeKey } from '../../ui-kit';

export type SiteHeaderProps = {
  lang: Language;
  theme: Theme;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
};
/** Page navigation and controlled preference actions; only the mobile menu state is local. */
export function SiteHeader({ lang, theme, onToggleLanguage, onToggleTheme }: SiteHeaderProps) {
  const t = localize(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  useEscapeKey(useCallback(() => setMenuOpen(false), []));
  const navigation = [
    ['home', t('About', 'Обо мне')],
    ['vinteo', 'Vinteo'],
    ['muse-group', 'Muse Group'],
    ['toolkit', t('Skills', 'Навыки')],
    ['experience', t('Earlier work', 'Ранний опыт')],
  ];
  return (
    <>
      <Link className="skip-link" href="#main">
        {t('Skip to content', 'Перейти к содержимому')}
      </Link>
      <header className="header wrap">
        <Link
          className="wordmark"
          href="#home"
          aria-label={t('Sergei Karukes, home', 'Сергей Карукес, начало')}
        >
          sk
        </Link>
        <nav aria-label={t('Main navigation', 'Основная навигация')}>
          {navigation.map(([id, label]) => (
            <Link href={`#${id}`} key={id}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            className="language"
            aria-label={t('Switch to Russian', 'Переключить на английский')}
            onClick={onToggleLanguage}
          >
            <span className={lang === 'en' ? 'current' : ''}>EN</span>
            <span>/</span>
            <span className={lang === 'ru' ? 'current' : ''}>RU</span>
          </Button>
          <IconButton
            className="icon-button"
            onClick={onToggleTheme}
            label={t(
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
              theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему',
            )}
            icon={theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          />
          <Link
            className="header-contact"
            href={contactLinks.telegram}
            target="_blank"
            rel="noreferrer"
          >
            {t('Contact', 'Связаться')}
            <ArrowUpRight size={15} />
          </Link>
          <IconButton
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
            label={t(
              menuOpen ? 'Close navigation' : 'Open navigation',
              menuOpen ? 'Закрыть меню' : 'Открыть меню',
            )}
            icon={menuOpen ? <X size={18} /> : <Menu size={18} />}
          />
        </div>
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          hidden={!menuOpen}
          aria-label={t('Mobile navigation', 'Мобильная навигация')}
        >
          {navigation.map(([id, label]) => (
            <Link href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowDown size={16} />
            </Link>
          ))}
          <Link href="#contact" onClick={() => setMenuOpen(false)}>
            {t('Contact', 'Контакты')}
            <ArrowDown size={16} />
          </Link>
        </nav>
      </header>
    </>
  );
}
