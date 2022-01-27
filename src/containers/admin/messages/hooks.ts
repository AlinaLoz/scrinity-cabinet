import useSWR from 'swr';
import { useRouter } from 'next/router';

import { CHATS_API } from '@constants/api.constants';
import { getChatsAPI } from '@api/chats.service';
import { CHAT_AUTH_TYPE, IChat } from '@interfaces/chats.interfaces';
import { CHATS_LIMIT } from '@constants/chats.constants';
import { SENDER_FILTER } from '@constants/message.constants';
import { useChatIdFromRoute } from '@containers/admin/messages/content/hooks';

type TUseFilter = {
  search: string,
  sender: string,
  skip: number,
  limit: number,
  onChange: (type: 'sender', value: string) => void,
};

export const useFilter = (): TUseFilter => {
  const router = useRouter();

  const search = router.query?.search as string || '';
  const sender = (router.query?.sender as string) || SENDER_FILTER.all;
  const skip = +(router.query.skip || 0);
  const limit = +(router.query.limit || CHATS_LIMIT);

  const onChange = (type: 'sender', value: string) => {
    if (!Object.keys(router.query).length) {
      return;
    }
    if (type === 'sender') {
      if (value === sender) {
        return;
      }
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          sender: value,
          skip: 0,
        },
      });
    }
  };

  return {
    search,
    sender,
    skip,
    limit,
    onChange,
  };
};

type TUseChats = [boolean, number, IChat[]];
export const useChats = (passSkip?: number, passLimit?: number): TUseChats => {
  const { skip, limit, sender } = useFilter();

  const { data, error } = useSWR(
    [CHATS_API, passSkip || skip, passLimit || limit, sender],
    () => getChatsAPI({
      skip: passSkip || skip,
      limit: passLimit || limit,
      ...(sender !== SENDER_FILTER.all && {
        authType: sender as CHAT_AUTH_TYPE,
      }),
    }),
    { refreshWhenHidden: false, revalidateIfStale: false, refreshInterval: 3 },
  );

  const isLoading = !error && !data;

  if (error || !data) {
    return [isLoading, 0, []];
  }

  return [isLoading, data.total, data.items];
};
