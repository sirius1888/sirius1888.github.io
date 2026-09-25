import { useEffect, type ComponentPropsWithoutRef, type RefObject } from 'react';

export type DialogSurfaceProps = Omit<
  ComponentPropsWithoutRef<'section'>,
  'role' | 'aria-label' | 'aria-modal' | 'onKeyDown'
> & {
  label: string;
  onDismiss: () => void;
  initialFocusRef: RefObject<HTMLButtonElement | null>;
};
/** Non-modal embedded dialog: initial focus, Escape dismissal and focus restoration on unmount. */
export function DialogSurface({ label, onDismiss, initialFocusRef, ...props }: DialogSurfaceProps) {
  useEffect(() => {
    const previous = document.activeElement;
    initialFocusRef.current?.focus({ preventScroll: true });
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, [initialFocusRef]);
  return (
    <section
      {...props}
      role="dialog"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onDismiss();
        }
      }}
    />
  );
}
