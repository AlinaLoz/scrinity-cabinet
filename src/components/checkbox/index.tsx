import React from 'react';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
  id: number;
  label?: string;
  value: boolean;
  onChange: () => void;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  id, label, value, onChange,
}) => (
  <label className={styles.checkbox} htmlFor={id.toString()}>
    <input type="checkbox" id={id.toString()} checked={value} onChange={onChange} />
    {label}
    <div />
  </label>
);
