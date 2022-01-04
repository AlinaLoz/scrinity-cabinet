export enum ANALYTIC_STEP {
  DAY= 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export interface IGetFeedbackAnalyticsProps {
  fromDate: string;
  toDate: string;
  step: ANALYTIC_STEP;
}

interface IFeedbackAnalyticsData {
  date: string;
  value: number;
}

export interface IGetFeedbackAnalyticsResponse {
  isGood: boolean;
  data: IFeedbackAnalyticsData[];
}
