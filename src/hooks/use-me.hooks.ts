import useSWR from 'swr';

import { getMeAPI } from '@api/user.service';
import { IGetMeAPIResponse, IUser } from '@interfaces/user.interfaces';
import { ME_API } from '@constants/api.constants';

export const useMe = (): [boolean, IUser | null] => {
  const { data, error } = useSWR<IGetMeAPIResponse>(ME_API, getMeAPI, { errorRetryCount: 2 });
  const isLoading = !error && !data;
  return [isLoading, !error && data?.user ? data.user : null];
};
