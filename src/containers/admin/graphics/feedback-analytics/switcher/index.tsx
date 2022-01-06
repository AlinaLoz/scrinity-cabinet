import React from 'react';
import cn from 'classnames';

import { ANALYTIC_STEP } from '@interfaces/analytics.interfaces';
import styles from './switcher.module.scss';

interface IProps {
  step: ANALYTIC_STEP;
  onChange: (newStep: ANALYTIC_STEP) => void;
}

export const Switcher: React.FC<IProps> = ({ onChange, step }) => (
  <div className={styles.switcher}>
    {[
      { key: ANALYTIC_STEP.DAY, value: 'День' },
      { key: ANALYTIC_STEP.MONTH, value: 'Месяц' },
      { key: ANALYTIC_STEP.YEAR, value: 'Год' },
    ].map((item) => (
      <p
        key={item.key}
        onClick={() => onChange(item.key)}
        className={cn({ [styles.active]: step === item.key })}
      >{item.value}
      </p>
    ))}
  </div>
);
