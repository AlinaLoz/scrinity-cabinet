import React from 'react';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
  label?: string;
  value: boolean;
  onChange: () => void;
}

export const Checkbox: React.FC<ICheckboxProps> = ({ label, value, onChange }) => (
  <label className={styles.checkbox} htmlFor="checkbox">
    <input type="checkbox" id="checkbox" checked={value} onChange={onChange} />
    {label}
    <div />
  </label>
);
