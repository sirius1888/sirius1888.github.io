import { ArrowUpRight, Github, Linkedin, Mail, Send } from 'lucide-react';
import { contactLinks } from '../../data/contacts';
import type { Language } from '../../i18n';
import { Link } from '../../ui-kit';

/** Shared social/contact links for the profile and footer; email remains a mailto link. */
export function SocialLinks({ lang }: { lang: Language }) {
  const links = [
    { href: contactLinks.github, label: 'GitHub', icon: Github, newTab: true },
    { href: contactLinks.linkedin, label: 'LinkedIn', icon: Linkedin, newTab: true },
    { href: contactLinks.telegram, label: 'Telegram', icon: Send, newTab: true },
    {
      href: contactLinks.email,
      label: lang === 'en' ? 'Email' : 'Почта',
      icon: Mail,
      newTab: false,
    },
  ];
  return (
    <div className="profile-socials">
      {links.map(({ href, label, icon: Icon, newTab }) => (
        <Link key={href} href={href} target={newTab ? '_blank' : undefined}>
          <Icon size={15} />
          {label}
          <ArrowUpRight size={12} />
        </Link>
      ))}
    </div>
  );
}
