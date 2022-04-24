import { get } from '@helpers/axios.helpers';
import { FEEDBACKS_API } from '@constants/api.constants';
import { IFeedbackRequest, IFeedbackResponse } from '@interfaces/feedbacks.interfaces';

export function getFeedbacksAPI(query: IFeedbackRequest): Promise<IFeedbackResponse> {
  return get(FEEDBACKS_API, query);
}
