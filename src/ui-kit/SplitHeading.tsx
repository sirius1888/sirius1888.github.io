import type { ReactNode } from 'react';
export type SplitHeadingProps = {
  titleId: string;
  title: string;
  leading: ReactNode;
  subtitle: string;
  detail: ReactNode;
};
/** Two-column heading with leading artwork and a secondary subtitle/detail block. All content comes from props. */
export function SplitHeading({ titleId, title, leading, subtitle, detail }: SplitHeadingProps) {
  return (
    <div className="employer-heading">
      <div className="employer-name">
        {leading}
        <h2 id={titleId}>{title}</h2>
      </div>
      <div className="employer-position">
        <strong>{subtitle}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}
