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
  iconComponent?: JSX.Element,
}

export const Input: React.FC<IInputProps> = ({
  placeholder, id, label, iconComponent,
  value, onChangeValue, className = '', ...props
}) => (
  <div>
    <label htmlFor={id} className={styles.label}>{label}</label>
    <div className={styles.inputWrapper}>
      <input
        {...props}
        id={id}
        maxLength={30}
        placeholder={placeholder}
        className={cn(className, styles.input, { [styles.icon]: !!iconComponent })}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
      {iconComponent}
    </div>

  </div>
);
