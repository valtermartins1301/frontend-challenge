import React, { FC, PropsWithChildren } from 'react';
import { default as S } from './styles.module.css';

interface TypographyProps extends PropsWithChildren {
  variant?: string;
  className?: string;
  htmlFor?: string;
}

const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h4: 'h4',
  h5: 'h5',
  label: 'label',
  body: 'div',
  caption: 'div',
  paragraph: 'p',
};

export const Typography: FC<TypographyProps> = ({
  variant = 'paragraph',
  children,
  className = '',
  htmlFor = '',
}) => {
  const Tag = tagMap[variant.toLowerCase()] || 'div';

  return (
    <Tag
      htmlFor={htmlFor}
      className={`${S.typography} ${S[variant.toLowerCase()] || S.paragraph} ${className}`}
    >
      {children}
    </Tag>
  );
};
