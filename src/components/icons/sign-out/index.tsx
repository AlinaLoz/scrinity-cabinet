/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface ISignOutIcon extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const SignOutIcon: React.FC<ISignOutIcon> = ({ className = '', ...props }) => (
	<svg className={className} {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.84211 3.7H17.1579C17.2414 3.7 17.3 3.76849 17.3 3.83333V8.83333C17.3 8.89817 17.2414 8.96667 17.1579 8.96667H2.84211C2.75862 8.96667 2.7 8.89817 2.7 8.83333V3.83333C2.7 3.76849 2.75862 3.7 2.84211 3.7ZM2.84211 12.0333H17.1579C17.2414 12.0333 17.3 12.1018 17.3 12.1667V17.1667C17.3 17.2315 17.2414 17.3 17.1579 17.3H2.84211C2.75862 17.3 2.7 17.2315 2.7 17.1667V12.1667C2.7 12.1018 2.75862 12.0333 2.84211 12.0333Z" stroke="#BDBDBD" strokeWidth="1.4"/>
	</svg>
);
