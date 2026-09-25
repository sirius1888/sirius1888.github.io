import type { ReactNode } from 'react';

export type ProductLabelProps = { image: string; title: string; detail: ReactNode };
/** Compact label above a device preview. Its repeated logo is decorative. */
export function ProductLabel({ image, title, detail }: ProductLabelProps) {
  return (
    <div className="phone-stage-tag">
      <img src={image} alt="" />
      <span>{title}</span>
      <small>{detail}</small>
    </div>
  );
}
