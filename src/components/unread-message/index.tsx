import React from 'react';
import cn from 'classnames';

import styles from './number-of-unread.module.scss';

interface IProps {
  numberOfUnread: number;
  className?: string;
}

export const NumberOfUnread: React.FC<IProps> = ({ className, numberOfUnread }) => (
  !numberOfUnread ? null : <p className={cn(styles.numberOfUnread, className)}>{numberOfUnread}</p>
);
