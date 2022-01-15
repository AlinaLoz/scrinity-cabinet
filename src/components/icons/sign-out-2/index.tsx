/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface ISignOutIcon2 extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const SignOutIcon2: React.FC<ISignOutIcon2> = ({ className = '', ...props }) => (
	<img src="/images/exit.png" alt="SignOutIcon2" className={className} />
);
