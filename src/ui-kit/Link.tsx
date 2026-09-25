import type { ComponentPropsWithRef } from 'react';

export type LinkProps = ComponentPropsWithRef<'a'>;
/** Native navigation or download link; new tabs always get opener isolation. */
export function Link({ target, rel, ...props }: LinkProps) {
  const safeRel =
    target === '_blank'
      ? [...new Set([...(rel?.split(/\s+/).filter(Boolean) ?? []), 'noopener', 'noreferrer'])].join(
          ' ',
        )
      : rel;
  return <a {...props} target={target} rel={safeRel} />;
}
