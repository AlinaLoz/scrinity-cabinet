import React from 'react';
import { Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import styles from './styles.module.scss';

type TOptions<T> = {
  key: T;
  value: string;
}

interface IFilterProps<T> {
  label: string;
  className?: string;
  onChange: (value: T) => void;
  options: TOptions<T>[],
  value: T;
}

export function Filter<T extends string>({
  onChange, options, value, label, className,
}: IFilterProps<T>) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <p className={styles.label}>{label}</p>
      <Dropdown className={styles.dropdown}>
        <Dropdown.Toggle className={styles.toggle} id="dropdown-basic">
          {options.find((item) => item.key === value)?.value}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((item) => (
            <Dropdown.Item key={item.key} onClick={() => onChange(item.key)}>{item.value}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
