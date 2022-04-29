import React, { ButtonHTMLAttributes } from 'react';

export interface IVisabilityIcon extends ButtonHTMLAttributes<SVGElement> {
  className?: string;
}

export const VisabilityIcon: React.FC<IVisabilityIcon> = ({ className = '', ...props }) => (
  <svg className={className} {...props} width="22" height="20" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      // eslint-disable-next-line max-len
      d="M0 8C1.73 3.61 6 0.5 11 0.5C16 0.5 20.27 3.61 22 8C20.27 12.39 16 15.5 11 15.5C6 15.5 1.73 12.39 0 8ZM19.82 8C18.17 4.63 14.79 2.5 11 2.5C7.21 2.5 3.83 4.63 2.18 8C3.83 11.37 7.21 13.5 11 13.5C14.79 13.5 18.17 11.37 19.82 8ZM11 5.5C12.38 5.5 13.5 6.62 13.5 8C13.5 9.38 12.38 10.5 11 10.5C9.62 10.5 8.5 9.38 8.5 8C8.5 6.62 9.62 5.5 11 5.5ZM6.5 8C6.5 5.52 8.52 3.5 11 3.5C13.48 3.5 15.5 5.52 15.5 8C15.5 10.48 13.48 12.5 11 12.5C8.52 12.5 6.5 10.48 6.5 8Z"
      fill="black"
      fillOpacity="0.54"
    />
  </svg>
);
