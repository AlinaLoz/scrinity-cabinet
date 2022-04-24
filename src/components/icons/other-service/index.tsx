/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface IGraphicsIcon extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const OtherServiceIcon: React.FC<IGraphicsIcon> = ({ className = '', ...props }) => (
	<svg className={className} {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2ZM6 9L10 13L14 9H6Z" fill="#BDBDBD"/>
	</svg>
);
