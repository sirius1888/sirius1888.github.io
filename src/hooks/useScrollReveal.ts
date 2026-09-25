import { useEffect, useRef } from 'react';

/** Decorative, once-only entrances. Content stays visible without JavaScript or observer support. */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          observer.unobserve(target);
          if (!preference.matches && !target.contains(document.activeElement)) {
            target.classList.add('reveal-enter');
          }
        }
      },
      { threshold: 0.08 },
    );

    // Do not replay entrances above the fold or when restoring a scrolled page.
    for (const target of targets) {
      if (target.getBoundingClientRect().top >= window.innerHeight) observer.observe(target);
    }

    const revealFocusedRegion = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest('[data-reveal]');
      if (!target) return;
      observer.unobserve(target);
      target.classList.remove('reveal-enter');
    };
    root.addEventListener('focusin', revealFocusedRegion);

    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', revealFocusedRegion);
      targets.forEach((target) => target.classList.remove('reveal-enter'));
    };
  }, []);

  return ref;
}
