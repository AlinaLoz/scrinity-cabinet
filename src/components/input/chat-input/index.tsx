import React from 'react';
import cn from 'classnames';
import { ClipIcon } from '@components/icons/clip';
import styles from './style.module.scss';

interface IChatInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const ChatInput: React.FC<IChatInputProps> = ({
  className, placeholder = '', value, onChange,
}) => (
  <div className={styles.wrapper}>
    <input
      placeholder={placeholder}
      className={cn(styles.input, className)}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    <div className={styles.icon}>
      <ClipIcon />
    </div>
  </div>
);
