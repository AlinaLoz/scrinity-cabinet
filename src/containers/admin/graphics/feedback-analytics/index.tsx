/* eslint-disable  import/no-duplicates */
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
/* eslint-disable  import/no-duplicates */

import React from 'react';
import {
  CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import cn from 'classnames';

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
  !payload?.value ? null : (
    <g transform={`translate(${x},${y})`} style={{}}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
        {step !== ANALYTIC_STEP.DAY ? null : format(new Date(payload.value), 'd MMM', { locale: ru }).replace(/\.$/, '')}
        {step !== ANALYTIC_STEP.WEEK ? null : format(new Date(payload.value), 'd MMM', { locale: ru }).replace(/\.$/, '')}
        {step !== ANALYTIC_STEP.MONTH ? null : format(new Date(payload.value), 'MMM', { locale: ru })}
        {step !== ANALYTIC_STEP.YEAR ? null : format(new Date(payload.value), 'yyyy', { locale: ru })}
      </text>
    </g>
  ));

interface IProps {
  step: ANALYTIC_STEP;
  setStep: (newStep: ANALYTIC_STEP) => void;
  fromDate: string;
  toDate: string;
}

export const FeedbackAnalytics: React.FC<IProps> = ({
  step, setStep, fromDate, toDate,
}) => {
  const [isLoading, analytics] = useFeedbackAnalytics({ step, toDate, fromDate });
  const [preparedGoodLineData] = prepareChartsData(analytics);

  return (
    <div className={cn(styles.feedbackAnalytics, 'feedback-analytics')}>
      <p className={styles.title}>Статистика отзывов</p>
      <Switcher step={step} onChange={setStep} />
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
