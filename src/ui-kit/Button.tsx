import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ButtonProps = ComponentPropsWithRef<'button'>;
/** Native action button. Does not submit a surrounding form unless explicitly requested. */
export function Button({ type = 'button', ...props }: ButtonProps) {
  return <button type={type} {...props} />;
}

export type IconButtonProps = Omit<ButtonProps, 'children' | 'aria-label'> & {
  label: string;
  icon: ReactNode;
};
/** Icon-only action with a required accessible name and native button behaviour. */
export function IconButton({ label, icon, ...props }: IconButtonProps) {
  return (
    <Button {...props} aria-label={label}>
      {icon}
    </Button>
  );
}

export type ToggleButtonProps = Omit<ButtonProps, 'aria-pressed' | 'onClick'> & {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
};
/** Controlled binary action; the parent owns its state. */
export function ToggleButton({ pressed, onPressedChange, ...props }: ToggleButtonProps) {
  return <Button {...props} aria-pressed={pressed} onClick={() => onPressedChange(!pressed)} />;
}
