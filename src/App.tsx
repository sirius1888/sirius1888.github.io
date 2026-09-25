import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { MuseSection } from './features/advertising/MuseSection';
import { ContactSection } from './features/contact/ContactSection';
import { ExperienceSection } from './features/experience/ExperienceSection';
import { ProfileHero } from './features/profile/ProfileHero';
import { SkillsPanel } from './features/profile/SkillsPanel';
import { VinteoSection } from './features/vinteo/VinteoSection';
import { usePreferences } from './hooks/usePreferences';
import { useScrollReveal } from './hooks/useScrollReveal';

/** Application composition root. Feature state remains owned by the corresponding chapter. */
export default function App() {
  const { lang, theme, toggleLanguage, toggleTheme } = usePreferences();
  const contentRef = useScrollReveal();
  return (
    <>
      <SiteHeader
        lang={lang}
        theme={theme}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
      />
      <main id="main" ref={contentRef}>
        <ProfileHero lang={lang} />
        <VinteoSection lang={lang} />
        <MuseSection lang={lang} />
        <SkillsPanel lang={lang} />
        <ExperienceSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
