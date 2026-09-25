import type { ReactNode } from 'react';

export type SectionMetaProps = {
  index: string;
  label: string;
  aside?: ReactNode;
  className?: string;
};
/** Section number and label, with an optional trailing slot for dates or platform information. */
export function SectionMeta({
  index,
  label,
  aside,
  className = 'chapter-overline',
}: SectionMetaProps) {
  return (
    <div className={className}>
      <span className="section-index">
        {`${index} / `}
        {label}
      </span>
      {aside}
    </div>
  );
}
