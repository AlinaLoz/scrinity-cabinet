/* eslint-disable  import/no-duplicates */
import {
  endOfMonth, endOfYear, format, startOfMonth, startOfYear,
} from 'date-fns';
import ru from 'date-fns/locale/ru';
/* eslint-disable  import/no-duplicates */

import React, { useCallback, useEffect, useState } from 'react';
import {
  CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';

import { ANALYTIC_STEP } from '@interfaces/analytics.interfaces';
import { prepareChartsData, useFeedbackAnalytics } from '@containers/admin/graphics/hooks';
import Loader from '@components/loader';
import styles from './styles.module.scss';
import { Switcher } from './switcher';

const CustomizedAxisTick: React.FC<{
  x: number, y: number, payload: { value: string }, step: ANALYTIC_STEP,
}> = ({
  x, y, payload, step,
}) => (
  <g transform={`translate(${x},${y})`} style={{}}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
      {step !== ANALYTIC_STEP.DAY ? null : format(new Date(payload.value), 'd MMM', { locale: ru }).replace(/\.$/, '')}
      {step !== ANALYTIC_STEP.MONTH ? null : format(new Date(payload.value), 'MMM', { locale: ru })}
      {step !== ANALYTIC_STEP.YEAR ? null : format(new Date(payload.value), 'yyyy', { locale: ru })}
    </text>
  </g>
);

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

export const FeedbackAnalytics: React.FC = () => {
  const [step, setStep] = useState(ANALYTIC_STEP.DAY);
  const [fromDate, setFromDate] = useState(FROM_TO_DATES[step].start);
  const [toDate, setToDate] = useState(FROM_TO_DATES[step].end);

  const [isLoading, analytics] = useFeedbackAnalytics({ step, toDate, fromDate });
  const [preparedGoodLineData] = prepareChartsData(analytics);

  useEffect(() => {
    setFromDate(FROM_TO_DATES[step].start);
    setToDate(FROM_TO_DATES[step].end);
  }, [step]);

  const onChangeSwitcher = useCallback(({ newStep }: { newStep: ANALYTIC_STEP }) => {
    setStep(newStep);
  }, []);

  return (
    <div className={styles.feedbackAnalytics}>
      <p className={styles.title}>Статистика отзывов</p>
      <Switcher step={step} onChange={onChangeSwitcher} />
      <ResponsiveContainer width="100%" height="80%">
        {isLoading ? <Loader /> : (!preparedGoodLineData.length) ? <div /> : (
          <LineChart
            width={1500}
            height={600}
            data={preparedGoodLineData}
            margin={{ right: 45, left: 0 }}
          >
            <CartesianGrid strokeDasharray="2 0" horizontal={false} />
            <XAxis axisLine={false} dataKey="date" height={60} tick={(props) => <CustomizedAxisTick step={step} {...props} />} />
            <YAxis axisLine={false} />
            <Tooltip />
            <Legend />
            <Line dot={false} legendType="circle" type="monotone" strokeWidth={2} dataKey="good" name="хорошие" stroke="#40798C" />
            <Line dot={false} legendType="circle" type="monotone" strokeWidth={2} dataKey="bad" name="плохие" stroke="#7471EE" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
