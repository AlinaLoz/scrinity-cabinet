import React from 'react';
import cn from 'classnames';
import { SearchIcon } from '@components/icons/search';
import styles from './styles.module.scss';

interface ISearchInputProps {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}
export const SearchInput: React.FC<ISearchInputProps> = ({
  placeholder = '', className, value, onChange,
}) => (
  <div className={cn(styles.wrapper, className)}>
    <SearchIcon className={styles.icon} />
    <input
      value={value}
      maxLength={50}
      className={cn(styles.search)}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);
