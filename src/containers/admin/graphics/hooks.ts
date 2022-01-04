import useSWR from 'swr';

import { ANALYTICS_FEEDBACK_API } from '@constants/api.constants';
import { getFeedbackAnalytics } from '@api/analytics.service';
import { IGetFeedbackAnalyticsProps, IGetFeedbackAnalyticsResponse } from '@interfaces/analytics.interfaces';
import { useMemo } from 'react';

type TUseFeedbackAnalytics = [boolean, IGetFeedbackAnalyticsResponse[]];
export const useFeedbackAnalytics = (props: IGetFeedbackAnalyticsProps): TUseFeedbackAnalytics => {
  const { data = [], error } = useSWR(
    [ANALYTICS_FEEDBACK_API, props],
    () => getFeedbackAnalytics(props),
  );
  const isLoading = !error && !data;
  // @ts-ignore
  return [isLoading, data];
};

type TLineChart = { date: string, good: number, bad: number }
export const prepareChartsData = (analytics: IGetFeedbackAnalyticsResponse[]): [TLineChart[]] => {
  const idxGood = analytics.findIndex((item) => item.isGood);
  const preparedGoodLineData = useMemo(() => {
    if (idxGood < 0) {
      return [];
    }
    return analytics[idxGood].data.map< TLineChart>((item, idx) => ({
      date: item.date,
      good: item.value,
      bad: analytics[1 - idxGood]?.data[idx]?.value || 0,
    }));
  }, [analytics, idxGood]);

  return [preparedGoodLineData];
};
