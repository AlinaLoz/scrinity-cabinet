/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface IMessageIcon extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const MessageIcon: React.FC<IMessageIcon> = ({ className = '', ...props }) => (
	<svg className={className} {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fillRule="evenodd" clipRule="evenodd" d="M3.40731 5.89091L3.4 14.6667L3.4 14.667C3.40019 14.8103 3.52331 14.9333 3.66667 14.9333H17C17.1435 14.9333 17.2667 14.8101 17.2667 14.6667V5.8856L10.7213 10.2492L10.333 10.508L9.94472 10.2492L3.40731 5.89091ZM16.9712 4.4H3.69483L10.333 8.82545L16.9712 4.4ZM2 14.6667L2.00833 4.66667C2.00833 3.75 2.75 3 3.66667 3H17C17.9167 3 18.6667 3.75 18.6667 4.66667V14.6667C18.6667 15.5833 17.9167 16.3333 17 16.3333H3.66667C2.75 16.3333 2 15.5833 2 14.6667Z" fill="white"/>
	</svg>
);
