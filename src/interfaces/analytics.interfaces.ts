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

export interface IGetCriterionsAnalyticsProps {
  fromDate: string;
  toDate: string;
}

interface IFeedbackAnalyticsData {
  date: string;
  value: number;
}

export interface IGetFeedbackAnalyticsResponse {
  isGood: boolean;
  data: IFeedbackAnalyticsData[];
}

interface ICriterionsAnalyticsData {
  criterionKey: string;
  value: number;
}

export interface IGetCriterionsAnalyticsResponse {
  isGood: boolean;
  data: ICriterionsAnalyticsData[];
}
