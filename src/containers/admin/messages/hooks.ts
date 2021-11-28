import useSWR from 'swr';
import { CHATS_API } from '@constants/api.constants';
import { getChatsAPI } from '@api/chats.service';
import { IChat } from '@interfaces/chats.interfaces';
import { useRouter } from 'next/router';
import { CHATS_LIMIT } from '@constants/chats.constants';
import { SENDER_FILTER } from '@constants/message.constants';

export const useFilter = () => {
  const router = useRouter();

  const search = router.query?.search || '';
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

type TUseChats = [number, IChat[]];
export const useChats = (): TUseChats => {
  const { skip, limit, sender } = useFilter();

  const { data, error } = useSWR(
    [CHATS_API, skip, limit, sender],
    () => getChatsAPI({
      skip,
      limit,
      ...(sender !== SENDER_FILTER.all && {
        isAnonymously: sender === SENDER_FILTER.anonymously,
      }),
    }),
    { refreshWhenHidden: false },
  );

  if (error || !data) {
    return [0, []];
  }
  return [data.total, data.items];
};
