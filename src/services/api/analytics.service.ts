import { ANALYTICS_CRITERIONS_API, ANALYTICS_FEEDBACK_API } from '@constants/api.constants';
import { get } from '@helpers/axios.helpers';
import {
  IGetCriterionsAnalyticsProps,
  IGetCriterionsAnalyticsResponse,
  IGetFeedbackAnalyticsProps,
  IGetFeedbackAnalyticsResponse,
} from '@interfaces/analytics.interfaces';

export function getFeedbackAnalytics(props: IGetFeedbackAnalyticsProps): Promise<IGetFeedbackAnalyticsResponse> {
  return get(ANALYTICS_FEEDBACK_API, props);
}

export function getCriterionsAnalytics(props: IGetCriterionsAnalyticsProps): Promise<IGetCriterionsAnalyticsResponse> {
  return get(ANALYTICS_CRITERIONS_API, props);
}
