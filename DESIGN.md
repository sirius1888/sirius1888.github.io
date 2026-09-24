# Portfolio design

I use the [xAI design study](https://getdesign.md/x.ai/design-md) as a reference for the page: a near-black canvas, neutral text, fine rules, regular-weight headings and outlined pill buttons.

## Foundations

- `src/tokens.css` defines palette values and semantic aliases for both themes, typography, spacing, radii and motion.
- `src/styles.css` contains the page layout and controls.
- `src/phone.css` contains the simulated app interfaces. Their product colours remain independent of the page theme.
- Inter is the open font alternative suggested by the reference; Geist Mono is used for short labels and configuration data. Both are served locally.
- Body text is 16px, the introduction is 18px, secondary text is 14px and short labels are 12px. App simulations use their own compact type scale.
- Spacing follows a 4px base. Sections use larger fluid spacing; panels use an 8px radius. No decorative page gradients or ambient glows.
- Dark is the default theme. Light mode is an intentional extension of the reference.
- Skills use a fluid two-column grid with 32px gutters and a 280px minimum column width. The core stack spans both columns; narrow containers fall back to one column. Fine rules separate the categories.
- Skill icons are monochrome in both themes. Single-colour marks share a neutral tone; multitone marks retain enough contrast to keep their internal details visible.
- Short prepositions, articles and conjunctions stay with the following word in English and Russian. The same text formatting runs during prerendering and in the browser.

## Interaction

- External links may use an up-right arrow. Local scenario controls use play/check icons, selected states and `aria-pressed`.
- Selecting a conference scenario on a narrow screen reveals and focuses the demo region. It never focuses the chat input automatically.
- A fixed, labelled link returns to the profile from any section.
- Page controls have at least 44px touch targets. Keyboard focus is visible, and reduced-motion preferences disable smooth scrolling and animation.
- The page supports English and Russian; labels and layouts must accommodate both without reducing body text sizes.

## Design skills

Guidance from [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills):

- [Design tokens](https://github.com/Owl-Listener/designer-skills/blob/main/design-systems/skills/design-token/SKILL.md)
- [Typography scale](https://github.com/Owl-Listener/designer-skills/blob/main/ui-design/skills/typography-scale/SKILL.md)
- [Responsive design](https://github.com/Owl-Listener/designer-skills/blob/main/ui-design/skills/responsive-design/SKILL.md)
- [Layout grid](https://github.com/Owl-Listener/designer-skills/blob/main/ui-design/skills/layout-grid/SKILL.md)
- [Affordance critique](https://github.com/Owl-Listener/designer-skills/blob/main/visual-critique/skills/critique-affordance/SKILL.md)
