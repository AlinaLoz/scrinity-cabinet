import React from 'react';
import NextLink from 'next/link';

interface ILinkProps {
  href: string
}

export const Link: React.FC<ILinkProps> = ({ href, children, ...props }) => (
  <NextLink href={href}>
    <a {...props}>
      {children}
    </a>
  </NextLink>
);
