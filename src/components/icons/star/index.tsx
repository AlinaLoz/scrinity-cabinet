import React, { ButtonHTMLAttributes } from 'react';

export interface IBackIcon extends ButtonHTMLAttributes<SVGElement> {
  className?: string;
  currentColor?: string;
}

export const StarIcon: React.FC<IBackIcon> = ({ className = '', currentColor, ...props }) => (
  <svg {...props} className={className} width="14" height="13" viewBox="0 0 14 13" fill={currentColor} xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path d="M7 0L9.05725 4.16844L13.6574 4.83688L10.3287 8.08156L11.1145 12.6631L7 10.5L2.8855 12.6631L3.6713 8.08156L0.342604 4.83688L4.94275 4.16844L7 0Z" fill={currentColor} />
  </svg>
);
