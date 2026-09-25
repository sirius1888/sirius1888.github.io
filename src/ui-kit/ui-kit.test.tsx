import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button, ChoiceGroup, DialogSurface, IconButton, Link, ToggleField } from './index';

describe('UI kit contracts', () => {
  it('preserves native refs and disabled behaviour without accidentally submitting forms', async () => {
    const user = userEvent.setup();
    const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const click = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(
      <form onSubmit={submit}>
        <Button ref={ref} onClick={click}>
          Preview
        </Button>
        <Button disabled onClick={click}>
          Unavailable
        </Button>
        <Button type="submit">Save</Button>
      </form>,
    );
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Preview' }));
    await user.click(ref.current!);
    await user.click(screen.getByRole('button', { name: 'Unavailable' }));
    expect(click).toHaveBeenCalledTimes(1);
    expect(submit).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it('names icon actions and supports keyboard activation', async () => {
    const user = userEvent.setup();
    const click = vi.fn();
    render(
      <IconButton label="Close preview" icon={<span aria-hidden="true">×</span>} onClick={click} />,
    );
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close preview' }));
    await user.keyboard('{Enter}');
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('isolates new tabs while preserving native download and in-page navigation', () => {
    render(
      <>
        <Link href="https://example.com" target="_blank" rel="ugc noreferrer">
          External
        </Link>
        <Link href="#skills">Skills</Link>
        <Link href="./resume.pdf" download>
          Resume
        </Link>
      </>,
    );
    const external = screen.getByRole('link', { name: 'External' });
    expect(new Set(external.getAttribute('rel')!.split(' '))).toEqual(
      new Set(['ugc', 'noreferrer', 'noopener']),
    );
    expect(screen.getByRole('link', { name: 'Skills' }).getAttribute('target')).toBeNull();
    expect(screen.getByRole('link', { name: 'Resume' }).hasAttribute('download')).toBe(true);
  });

  it('keeps rich choice rendering independent of controlled selection and accessible names', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const options = [
      { value: 'first', label: 'First app' },
      { value: 'second', label: 'Second app' },
    ] as const;
    const view = (value: 'first' | 'second') => (
      <ChoiceGroup
        label="Apps"
        value={value}
        options={options}
        onValueChange={change}
        renderOption={(option) => (
          <strong>
            {option.label}
            <span aria-hidden="true"> ✓</span>
          </strong>
        )}
      />
    );
    const { rerender } = render(view('first'));
    await user.click(screen.getByRole('button', { name: 'Second app' }));
    expect(change).toHaveBeenCalledWith('second');
    expect(screen.getByRole('button', { name: 'First app' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
    rerender(view('second'));
    expect(screen.getByRole('button', { name: 'Second app' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
  });

  it('reports the next toggle value and respects disabled controls', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const view = (pressed: boolean, disabled = false) => (
      <ToggleField
        title="Analytics"
        description="Demo events"
        icon={<span aria-hidden="true">◦</span>}
        pressed={pressed}
        disabled={disabled}
        onPressedChange={change}
      />
    );
    const { rerender } = render(view(false));
    await user.click(screen.getByRole('button', { name: 'Analytics Demo events' }));
    expect(change).toHaveBeenCalledWith(true);
    rerender(view(true, true));
    await user.click(screen.getByRole('button', { name: 'Analytics Demo events' }));
    expect(change).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true');
  });

  it('focuses an embedded dialog, contains Escape and restores focus to its opener', async () => {
    const user = userEvent.setup();
    const documentKey = vi.fn();
    function Example() {
      const [open, setOpen] = useState(false);
      const close = useRef<HTMLButtonElement>(null);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open ad</Button>
          {open && (
            <DialogSurface label="Demo ad" initialFocusRef={close} onDismiss={() => setOpen(false)}>
              <IconButton
                ref={close}
                label="Close ad"
                icon={<span>×</span>}
                onClick={() => setOpen(false)}
              />
            </DialogSurface>
          )}
        </>
      );
    }
    render(<Example />);
    const opener = screen.getByRole('button', { name: 'Open ad' });
    await user.click(opener);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close ad' }));
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBeNull();
    document.addEventListener('keydown', documentKey);
    try {
      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(document.activeElement).toBe(opener);
      expect(documentKey).not.toHaveBeenCalled();
    } finally {
      document.removeEventListener('keydown', documentKey);
    }
  });
});
