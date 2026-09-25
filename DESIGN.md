# Portfolio design

I use the [xAI design study](https://getdesign.md/x.ai/design-md) as a reference for the page: a near-black canvas, neutral text, fine rules, regular-weight headings and outlined pill buttons.

## Foundations

- `src/tokens.css` defines palette values and semantic aliases for both themes, typography, spacing, radii and motion.
- `src/styles.css` contains the page layout and controls.
- `src/ui-kit/ui-kit.css` contains shared primitive styles and the device frame; component contracts are documented in `src/ui-kit/README.md`.
- `src/phone.css` contains the simulated app interfaces. Their product colours remain independent of the page theme.
- Inter is the open font alternative suggested by the reference; Geist Mono is used for short labels and configuration data. Both are served locally.
- Body text is 16px, the introduction is 18px, secondary text is 14px and short labels are 12px. App simulations use their own compact type scale.
- Spacing follows a 4px base. Sections use larger fluid spacing; panels use an 8px radius. No decorative page gradients or ambient glows.
- Dark is the default theme. Light mode is an intentional extension of the reference.
- The first screen prioritizes the name, the Team Lead React Native Developer role and a direct contact action. A compact portrait sits beside the introduction; only four core technologies appear here. The introduction fills at least the viewport below the header, with a scroll link to Vinteo in its bottom strip; short screens can grow naturally without clipping content.
- The full skill list follows the Vinteo and Muse cases in a two-column grid, falling back to one column on narrow screens. Fine rules separate the categories.
- Muse presents personal responsibilities and team value before the visual ad example. The SDK/adapter diagram is collapsed under a native details disclosure. Ultimate Guitar and MuseScore are examples of company products, not the scope limit of the shared module.
- Skill icons are monochrome in both themes. Single-colour marks share a neutral tone; multitone marks retain enough contrast to keep their internal details visible.
- Short prepositions, articles and conjunctions stay with the following word in English and Russian. The same text formatting runs during prerendering and in the browser.

## Interaction

- External links may use an up-right arrow. Local scenario controls use play/check icons, selected states and `aria-pressed`.
- Selecting a conference scenario on a narrow screen reveals and focuses the demo region. It never focuses the chat input automatically.
- A fixed, labelled link returns to the profile after scrolling down by at least one viewport height. It is hidden on the first screen and updates when the viewport is resized.
- Page controls have at least 44px touch targets. Keyboard focus is visible, and reduced-motion preferences disable smooth scrolling and animation.
- The page supports English and Russian; labels and layouts must accommodate both without reducing body text sizes.

## Motion

- `src/motion.css` defines short, staggered hero entrances, once-only scroll reveals, control feedback, disclosure entrances and the return-to-top entrance. Durations and easing live in `tokens.css`.
- `useScrollReveal` observes explicit `data-reveal` regions inside the main content. Entrances start 120px before a region reaches the viewport, independent of its height, and last 420ms. It skips regions already visible on mount and stops observing each region after its first entrance. It disconnects on cleanup, including React Strict Mode's development cycle.
- Resting content is always visible: JavaScript and IntersectionObserver are enhancements, not prerequisites for reading. Keyboard focus completes scroll entrances immediately, and `prefers-reduced-motion` disables decorative movement, including animations already running.
- The scroll arrow gives two gentle cues, then stops. Hover movement is limited to devices with a fine pointer. Animations do not change document layout or gate any action.

## Design skills

Guidance from [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills):

- [Design tokens](https://github.com/Owl-Listener/designer-skills/blob/main/design-systems/skills/design-token/SKILL.md)
- [Typography scale](https://github.com/Owl-Listener/designer-skills/blob/main/ui-design/skills/typography-scale/SKILL.md)
- [Responsive design](https://github.com/Owl-Listener/designer-skills/blob/main/ui-design/skills/responsive-design/SKILL.md)
- [Layout grid](https://github.com/Owl-Listener/designer-skills/blob/main/ui-design/skills/layout-grid/SKILL.md)
- [Affordance critique](https://github.com/Owl-Listener/designer-skills/blob/main/visual-critique/skills/critique-affordance/SKILL.md)
