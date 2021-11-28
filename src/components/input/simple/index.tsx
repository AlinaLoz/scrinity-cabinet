import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './simple.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export const Input: React.FC<IInputProps> = ({
  placeholder, id, label,
  value, onChangeValue, className = '', ...props
}) => (
  <div>
    <label htmlFor={id} className={styles.label}>{label}</label>
    <input
      {...props}
      id={id}
      maxLength={30}
      placeholder={placeholder}
      className={cn(className, styles.input)}
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  </div>
);
