import { IPagination } from '@interfaces/pagination.interfaces';
import { PLATFORM_AGGREGATORS } from '@constants/feedbacks.constants';

export interface IFeedbackRequest extends IPagination {
  key: PLATFORM_AGGREGATORS;
}

export interface IFeedback {
  date: string;
  icon: string | null;
  id: number;
  text: string;
  profession: string;
  rating: number;
  author: string;
}

export interface IFeedbackResponse {
  total: number;
  items: IFeedback[];
}
