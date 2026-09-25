import type { ReactNode } from 'react';

export type ListRowProps = {
  leading: ReactNode;
  title: ReactNode;
  description: ReactNode;
  trailing?: ReactNode;
  className?: string;
};
/** Presentational icon/title/detail row. Navigation and domain content belong to the caller. */
export function ListRow({ leading, title, description, trailing, className }: ListRowProps) {
  return (
    <div className={className}>
      <span>{leading}</span>
      <div>
        <strong>{title}</strong>
        <small>{description}</small>
      </div>
      {trailing}
    </div>
  );
}
