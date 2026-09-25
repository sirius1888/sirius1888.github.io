import type { ReactNode } from 'react';
import { ToggleButton, type ToggleButtonProps } from './Button';

export type ToggleFieldProps = Omit<ToggleButtonProps, 'children' | 'title'> & {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
};
/** Labelled setting with an icon, description and decorative switch indicator. */
export function ToggleField({
  icon,
  title,
  description,
  className = '',
  pressed,
  ...props
}: ToggleFieldProps) {
  return (
    <ToggleButton
      {...props}
      pressed={pressed}
      className={`${className} ${pressed ? 'enabled' : ''}`.trim()}
    >
      {icon}
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <span className="toggle" aria-hidden="true" />
    </ToggleButton>
  );
}
