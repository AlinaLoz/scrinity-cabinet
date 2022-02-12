import React, { useEffect, useState } from 'react';

import { ANALYTIC_STEP } from '@interfaces/analytics.interfaces';
import {
  endOfMonth, endOfYear, format, startOfMonth, startOfYear,
} from 'date-fns';
import Admin from '../../../layouts/admin';
import { CriterionsAnalytics } from './criterions-analytics';
import { FeedbackAnalytics } from './feedback-analytics';
import styles from './graphics.module.scss';

const formatDate = 'yyyy-MM-dd';

const startMonth = format(startOfMonth(new Date()), formatDate);
const endMonth = format(endOfMonth(new Date()), formatDate);

const startYear = format(startOfYear(new Date()), formatDate);
const endYear = format(endOfYear(new Date()), formatDate);

const FROM_TO_DATES = {
  [ANALYTIC_STEP.DAY]: { start: startMonth, end: endMonth },
  [ANALYTIC_STEP.WEEK]: { start: startMonth, end: endMonth },
  [ANALYTIC_STEP.MONTH]: { start: startYear, end: endYear },
  [ANALYTIC_STEP.YEAR]: { start: '2022-01-01', end: '2030-01-01' },
};

export const AdminGraphics: React.FC = () => {
  const [step, setStep] = useState(ANALYTIC_STEP.DAY);
  const [fromDate, setFromDate] = useState(FROM_TO_DATES[step].start);
  const [toDate, setToDate] = useState(FROM_TO_DATES[step].end);

  useEffect(() => {
    setFromDate(FROM_TO_DATES[step].start);
    setToDate(FROM_TO_DATES[step].end);
  }, [step]);

  return (
    <Admin>
      <main className={styles.main}>
        <FeedbackAnalytics
          step={step}
          fromDate={fromDate}
          toDate={toDate}
          setStep={setStep}
        />
        <CriterionsAnalytics
          step={step}
          fromDate={fromDate}
          toDate={toDate}
        />
      </main>
    </Admin>
  );
};
