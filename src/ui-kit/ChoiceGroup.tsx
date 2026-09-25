import type { ReactNode } from 'react';
import { Button } from './Button';

export type ChoiceOption<Value extends string> = { value: Value; label: string };
export type ChoiceGroupProps<Value extends string, Option extends ChoiceOption<Value>> = {
  label: string;
  value: Value;
  options: readonly Option[];
  onValueChange: (value: Value) => void;
  className?: string;
  id?: string;
  controls?: string;
  renderOption?: (option: Option, selected: boolean, index: number) => ReactNode;
};
/** A controlled group of pressed buttons. Custom option content never owns selection state. */
export function ChoiceGroup<Value extends string, Option extends ChoiceOption<Value>>({
  label,
  value,
  options,
  onValueChange,
  className,
  id,
  controls,
  renderOption,
}: ChoiceGroupProps<Value, Option>) {
  return (
    <div className={className} id={id} role="group" aria-label={label}>
      {options.map((option, index) => (
        <Button
          key={option.value}
          aria-pressed={value === option.value}
          aria-label={option.label}
          aria-controls={controls}
          onClick={() => onValueChange(option.value)}
        >
          {renderOption ? renderOption(option, value === option.value, index) : option.label}
        </Button>
      ))}
    </div>
  );
}
