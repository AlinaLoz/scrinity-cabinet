import { ANALYTICS_FEEDBACK_API } from '@constants/api.constants';
import { get } from '@helpers/axios.helpers';
import { IGetFeedbackAnalyticsProps, IGetFeedbackAnalyticsResponse } from '@interfaces/analytics.interfaces';

export function getFeedbackAnalytics(props: IGetFeedbackAnalyticsProps): Promise<IGetFeedbackAnalyticsResponse> {
  return get(ANALYTICS_FEEDBACK_API, props);
}
