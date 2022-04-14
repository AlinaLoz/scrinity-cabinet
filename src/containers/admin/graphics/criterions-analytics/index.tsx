import React from 'react';
import cn from 'classnames';
import { isMobile } from 'mobile-device-detect';

import { ANALYTIC_STEP } from '@interfaces/analytics.interfaces';

import {
  Cell, Legend, Pie, PieChart,
} from 'recharts';
import Loader from '@components/loader';
import { userCriterions } from '@hooks/use-criterions';
import { useCriterionsAnalytics } from '../hooks';
import styles from './criterions.module.scss';

interface IProps {
  step: ANALYTIC_STEP;
  fromDate: string;
  toDate: string;
}
const COLORS_GOOD = ['#95EBEB', '#FF8000', '#D4A276', '#033270', '#DFDC27', '#01C0F6'];
// const COLORS_BAD = ['#006DAB', '#D83400', '#B27B4A', '#3E4A59', '#AEA443', '#728C92'];
type TPayload = { payload: { fill: string, value: string, criterionKey: string } }[];

const CustomLegend: React.FC<{ title: string, payload: TPayload }> = ({ title, payload }) => {
  const [, criterions] = userCriterions();

  return (
    <div className={styles.legend}>
      <p className={styles.legendTitle}>{title}</p>
      <ul>
        {payload.map((entry) => (
          <p className={styles.legendlabel} key={entry.payload.criterionKey}>
            <span className={styles.icon} style={{ backgroundColor: entry.payload.fill }} />
            <span>{criterions[entry.payload.criterionKey]}</span>
            <span>{entry.payload.value}</span>
          </p>
        ))}
      </ul>
    </div>
  );
};

export const CriterionsAnalytics: React.FC<IProps> = ({ step, fromDate, toDate }) => {
  const [isLoading, analytics] = useCriterionsAnalytics({ step, toDate, fromDate });

  return (
    <div className={cn(styles.criterionsWrapper, 'piecharts')}>
      {isLoading ? <Loader /> : (
        analytics.map((analytic) => (
          !analytic.data.length ? (
            <div className={cn(styles.legendTitle, styles.noData)}>
              {analytic.isGood ? 'Положительных отзывов нет' : 'Отрицательных отзывов нет'}
            </div>
          )
            : (
              <>
                <p className={styles.legendTitleBig}>{analytic.isGood ? 'Положительные' : 'Отрицательные'}</p>
                <PieChart
                  key={`criterions${analytic.isGood ? 'good' : 'bad'}`}
                  width={800}
                  height={340}
                >
                  <text
                    x={isMobile ? '50%' : '25%'}
                    y={isMobile ? '-3%' : '45%'}
                    textAnchor="middle"
                    className={styles.legendCenterLabel}
                  >
                    Общее
                  </text>
                  <text
                    x={isMobile ? '50%' : '25%'}
                    y={isMobile ? '10%' : '60%'}
                    textAnchor="middle"
                    className={styles.legendCenterLabelBold}
                  >
                    {analytic.data.reduce((acc, { value }) => acc + value, 0)} шт
                  </text>
                  <Pie
                    width="200%"
                    cx={isMobile ? '50%' : '25%'}
                    cy={isMobile ? '0' : '50%'}
                    data={analytic?.data}
                    innerRadius={105}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    cornerRadius={20}
                    paddingAngle={5}
                  >
                    {analytic?.data.map((entry, idx) => (
                      <Cell
                        key={entry.criterionKey}
                        fill={COLORS_GOOD[idx % COLORS_GOOD.length]}
                      />
                    ))}
                  </Pie>
                  {// @ts-ignore
                    // eslint-disable-next-line max-len
                    <Legend layout="vertical" verticalAlign="middle" content={(props) => <CustomLegend {...props} title={analytic.isGood ? 'Положительные' : 'Отрицательные'} />} />
                  }
                </PieChart>
              </>
            )
        ))
      )}
    </div>
  );
};
