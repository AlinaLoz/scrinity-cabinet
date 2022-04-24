import { useRouter } from 'next/router';
import useSWR from 'swr';

import { DEFAULT_PLATFORM_AGGREGATORS, FEEDBACKS_LIMIT, PLATFORM_AGGREGATORS } from '@constants/feedbacks.constants';
import { ANALYTICS_FEEDBACK_API } from '@constants/api.constants';
import { getFeedbacksAPI } from '@api/feedbacks.service';
import { IFeedback } from '@interfaces/feedbacks.interfaces';

type TUseFilter = {
  skip: number,
  limit: number,
  platform: PLATFORM_AGGREGATORS,
  onChange: (value: string) => void,
};

export const useFilter = (): TUseFilter => {
  const router = useRouter();

  const platform = router.query?.platform as PLATFORM_AGGREGATORS || DEFAULT_PLATFORM_AGGREGATORS;
  const skip = +(router.query.skip || 0);
  const limit = +(router.query.limit || FEEDBACKS_LIMIT);

  const onChange = (value: string): void => {
    router.push({ pathname: router.pathname, query: { ...router.query, platform: value, skip: 0 } });
  };

  return {
    platform,
    skip,
    limit,
    onChange,
  };
};

type TUseFeedbacks = [boolean, number, IFeedback[]];
export const useFeedbacks = (): TUseFeedbacks => {
  const { skip, limit, platform: key } = useFilter();

  const { data, error } = useSWR(
    [ANALYTICS_FEEDBACK_API, skip, limit, key],
    () => getFeedbacksAPI({
      skip, limit, key,
    }),
    { refreshWhenHidden: false, revalidateIfStale: false },
  );

  const isLoading = !error && !data;

  if (error || !data) {
    return [isLoading, 0, []];
  }

  return [isLoading, data.total, data.items];
};
