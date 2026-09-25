import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { skillGroups } from './content';

const apps = () => screen.getByRole('group', { name: 'Select advertising app' });
const formats = () => screen.getByRole('group', { name: 'Advertising format' });
const sdk = () => screen.getByRole('group', { name: 'Advertising SDK' });
const consent = () => screen.getByRole('button', { name: /Show ads in\s+this example/ });
const openArchitecture = (user: ReturnType<typeof userEvent.setup>) =>
  user.click(screen.getByText('How it works technically'));

describe('Portfolio v2 visitor journeys', () => {
  it('prioritizes the lead profile and contact, with the full stack after the main cases', () => {
    const { container } = render(<App />);
    const intro = screen.getByRole('region', { name: /Sergei.*Karukes/ });
    expect(intro.querySelectorAll('.skill-category')).toHaveLength(0);
    expect(within(intro).getByText('Team Lead React Native Developer')).toBeTruthy();
    const message = within(intro).getByRole('link', { name: 'Message me' });
    expect(message.getAttribute('href')).toBe('https://t.me/ser1888');
    expect(message.classList.contains('button-accent')).toBe(true);
    expect(within(intro).getByRole('link', { name: 'Download CV' }).hasAttribute('download')).toBe(
      true,
    );
    const skills = screen.getByRole('region', { name: 'Technologies I work with' });
    expect(skills.querySelectorAll('.skill-category li')).toHaveLength(
      skillGroups.flatMap((group) => group.items).length,
    );
    const details = screen.getByText('How it works technically').closest('details')!;
    expect(details.open).toBe(false);
    const muse = screen.getByRole('region', { name: 'Muse Group' });
    expect(within(muse).getByText('MY RESPONSIBILITIES')).toBeTruthy();
    expect(
      within(muse).getByText('Built a shared advertising module for company products.'),
    ).toBeTruthy();
    expect(
      muse.querySelector('.ad-showcase')!.compareDocumentPosition(details) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(intro.querySelector('[hidden]')).toBeNull();
    expect(intro.querySelector('.iphone-shell')).toBeNull();
    expect([...container.querySelectorAll('main > section')].map((section) => section.id)).toEqual([
      'home',
      'vinteo',
      'muse-group',
      'toolkit',
      'experience',
      'contact',
    ]);
    expect(screen.getByText('Five colleagues, plus me as Team Lead.')).toBeTruthy();
    const team = screen.getByLabelText('Team composition excluding myself');
    expect(team.textContent).toBe('2developers2QA engineers1PM');
    expect(screen.getByText('Advertising Department')).toBeTruthy();
    expect(screen.queryByText(/Monetization team|Two products\./)).toBeNull();
  });
  it('retains the ad configuration and call state across language and theme changes and restores preferences', async () => {
    const user = userEvent.setup();
    const view = render(<App />);
    await openArchitecture(user);
    await user.click(within(sdk()).getByRole('button', { name: 'ironSource' }));
    await user.click(within(apps()).getByRole('button', { name: 'MuseScore' }));
    await user.click(screen.getByRole('button', { name: 'Open conference chat' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Chat message' }),
      'Hello from the portfolio',
    );
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    await user.click(screen.getByRole('button', { name: /^Switch to\s+light theme$/ }));
    await user.click(screen.getByRole('button', { name: /^Switch to\s+Russian$/ }));
    expect(document.documentElement.lang).toBe('ru');
    expect(document.documentElement.dataset.theme).toBe('light');
    const introRu = screen.getByRole('region', { name: 'Сергей Карукес' });
    const normalize = (text: string | null) => text?.replace(/\s+/g, ' ');
    expect(normalize(introRu.querySelector('.profile-role')!.textContent)).toBe(
      'Team Lead React Native разработчик',
    );
    expect(normalize(introRu.querySelector('.profile-bio p')!.textContent)).toBe(
      'Разработчик для iOS и Android на react-native.',
    );
    expect(normalize(introRu.querySelector('.profile-bio p + p')!.textContent)).toBe(
      'В Vinteo также руковожу командой и организую разработку и оперирую процессами.',
    );
    expect(screen.getByText('Как устроено технически').closest('details')!.open).toBe(true);
    expect(screen.getByRole('button', { name: 'ironSource' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
    expect(
      within(screen.getByRole('group', { name: /^Выбрать приложение с\s+рекламой$/ }))
        .getByRole('button', { name: 'MuseScore' })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    expect(screen.getByText('Hello from the portfolio')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Скачать резюме' }).getAttribute('href')).toContain(
      '_RU.pdf',
    );
    view.unmount();
    render(<App />);
    expect(document.documentElement.lang).toBe('ru');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
  it('keeps chat input as text and closes the scene with Escape', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Open conference chat' }));
    const payload = '<img src=x onerror=alert(1)>';
    await user.type(screen.getByRole('textbox', { name: 'Chat message' }), payload);
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByText(payload).querySelector('img')).toBeNull();
    expect((screen.getByRole('textbox', { name: 'Chat message' }) as HTMLInputElement).value).toBe(
      '',
    );
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('textbox', { name: 'Chat message' })).toBeNull();
  });
  it('brings a mobile scenario into view without focusing the chat input', async () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: query === '(max-width: 800px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Conference chat' }));
    const stage = screen.getByRole('region', { name: 'Interactive conference demo' });
    expect(document.activeElement).toBe(stage);
    expect(document.activeElement).not.toBe(screen.getByRole('textbox', { name: 'Chat message' }));
    expect(stage.scrollIntoView).toHaveBeenCalledWith({ block: 'start' });
    await user.type(screen.getByRole('textbox', { name: 'Chat message' }), 'Mobile demo');
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByText('Mobile demo')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Viewer mode' }));
    expect(document.activeElement).toBe(stage);
    expect(screen.queryByRole('textbox', { name: 'Chat message' })).toBeNull();
  });
  it('keeps desktop focus on the selected scenario and does not scroll the page', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: 'Conference chat' });
    await user.click(button);
    expect(document.activeElement).toBe(button);
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox', { name: 'Chat message' })).toBeTruthy();
  });
  it('restricts viewer capture, returns from PiP and can rejoin after hanging up', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Viewer mode' }));
    expect(
      (screen.getByRole('button', { name: 'Mute microphone' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    expect(
      (screen.getByRole('button', { name: 'Turn camera off' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    await user.click(screen.getByRole('button', { name: /^Picture in\s+Picture$/ }));
    await user.click(screen.getByRole('button', { name: /^Return to\s+full call$/ }));
    expect(
      (screen.getByRole('button', { name: 'Mute microphone' }) as HTMLButtonElement).disabled,
    ).toBe(false);
    await user.click(screen.getByRole('button', { name: 'End demo call' }));
    expect(screen.getByRole('heading', { name: 'Call ended' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Join again' }));
    expect(screen.getByRole('button', { name: 'End demo call' })).toBeTruthy();
  });
  it('recovers a simulated connection and cancels recovery when another scenario is selected', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Reconnection' }));
    expect(screen.getByText('Your call will resume shortly.')).toBeTruthy();
    act(() => vi.advanceTimersByTime(2800));
    expect(screen.queryByText('Your call will resume shortly.')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Reconnection' }));
    fireEvent.click(screen.getByRole('button', { name: 'Conference chat' }));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByRole('textbox', { name: 'Chat message' })).toBeTruthy();
  });
  it('shares SDK and adapter configuration across both products and disconnects analytics independently', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openArchitecture(user);
    await user.click(within(sdk()).getByRole('button', { name: 'ironSource' }));
    await user.click(screen.getByRole('button', { name: 'Adapter B' }));
    expect(screen.getByRole('status', { name: 'Demo analytics events' }).textContent).toContain(
      'adapter.changed',
    );
    await user.click(screen.getByRole('button', { name: /Analytics Independent event module/ }));
    await user.click(screen.getByRole('button', { name: /Experiments SDK/ }));
    await user.click(within(apps()).getByRole('button', { name: 'MuseScore' }));
    expect(screen.getByRole('status', { name: 'Demo analytics events' }).textContent).toContain(
      'Demo events are not recorded',
    );
    expect(screen.getByRole('button', { name: 'ironSource' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
    expect(screen.getByRole('button', { name: 'Adapter B' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
    expect(screen.getByText('EXPERIMENT PREVIEW')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Reset advertising architecture' }));
    expect(screen.getByRole('button', { name: 'GAM' }).getAttribute('aria-pressed')).toBe('true');
    expect(
      within(apps()).getByRole('button', { name: 'Ultimate Guitar' }).getAttribute('aria-pressed'),
    ).toBe('true');
    expect(screen.queryByText('EXPERIMENT PREVIEW')).toBeNull();
  });
  it('gates banner and native placements on consent and opens/dismisses interstitials', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    expect(container.querySelector('.demo-creative.compact')).not.toBeNull();
    await user.click(consent());
    expect(container.querySelector('.demo-creative')).toBeNull();
    await user.click(consent());
    expect(container.querySelector('.demo-creative.compact')).not.toBeNull();
    await user.click(within(formats()).getByRole('button', { name: /In-feed ad/ }));
    expect(container.querySelector('.demo-creative:not(.compact)')).not.toBeNull();
    await user.click(within(formats()).getByRole('button', { name: /Full-screen ad/ }));
    await user.click(screen.getByRole('button', { name: 'Show full-screen ad' }));
    expect(screen.getByRole('dialog', { name: 'Interstitial advertising demo' })).toBeTruthy();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(consent());
    expect(
      (screen.getByRole('button', { name: 'Show full-screen ad' }) as HTMLButtonElement).disabled,
    ).toBe(true);
  });
  it('only gives a rewarded benefit after completion and cancels it when switching products or withdrawing consent', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(within(formats()).getByRole('button', { name: /With\s+a\s+reward/ }));
    fireEvent.click(screen.getByRole('button', { name: /^Watch\s+and\s+get\s+a\s+reward$/ }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole('button', { name: 'Collect demo reward' })).toBeNull();
    fireEvent.click(within(apps()).getByRole('button', { name: 'MuseScore' }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('Demo reward received')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /^Watch\s+and\s+get\s+a\s+reward$/ }));
    act(() => vi.advanceTimersByTime(4000));
    fireEvent.click(screen.getByRole('button', { name: 'Collect demo reward' }));
    expect(screen.getByText('Demo reward received')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /^Watch\s+and\s+get\s+a\s+reward$/ }));
    fireEvent.click(consent());
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('Demo reward received')).toBeNull();
  });
  it('keeps O! historical and text-only and links to the confirmed contact and both apps', () => {
    render(<App />);
    const historical = screen.getByRole('heading', { name: 'O!' }).closest('article')!;
    expect(within(historical).getAllByRole('listitem')).toHaveLength(6);
    expect(historical.querySelector('button,img,video')).toBeNull();
    for (const link of screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href')?.includes('t.me/')))
      expect(link.getAttribute('href')).toBe('https://t.me/ser1888');
    expect(
      screen
        .getByRole('link', { name: /^Vinteo Mobile on\s+the\s+App Store$/ })
        .getAttribute('href'),
    ).toContain('1582762458');
  });
  it('hydrates the complete static HTML without mismatches and restores saved preferences', () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<App />);
    document.body.appendChild(container);
    localStorage.setItem('sk-language', 'ru');
    localStorage.setItem('sk-theme', 'light');
    const errors = vi.spyOn(console, 'error');
    render(<App />, { container, hydrate: true });
    expect(errors).not.toHaveBeenCalled();
    expect(document.documentElement.lang).toBe('ru');
    expect(document.documentElement.dataset.theme).toBe('light');
    errors.mockRestore();
  });
  it('works when preference storage is unavailable', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage disabled');
    });
    expect(() => render(<App />)).not.toThrow();
    spy.mockRestore();
  });
});
