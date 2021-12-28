import useSWR from 'swr';
import { useEffect, useMemo } from 'react';
import { startOfDay } from 'date-fns';

import { CHAT_BY_ID_API } from '@constants/api.constants';
import { getChatByIdAPI } from '@api/chats.service';
import { IChatById } from '@interfaces/chats.interfaces';

export type TMessagesByDay = Record<string, IChatById[]>;

/* eslint-disable  @typescript-eslint/no-explicit-any  */
let widget: any = null;

/* eslint-disable  @typescript-eslint/no-explicit-any  */
export const getWidget = async (): Promise<typeof widget> => {
  if (!widget) {
    widget = await import('scrinity-chat');
  }
  /* eslint-disable  @typescript-eslint/no-unsafe-return */
  return widget;
};

export const useChat = (feedbackId: number): [boolean, IChatById[], TMessagesByDay] => {
  const { data, error } = useSWR(
    CHAT_BY_ID_API(feedbackId),
    () => getChatByIdAPI(feedbackId),
  );

  const isLoading = !error && !data;
  const messagesByDay = useMemo(() => {
    if (!data?.items) {
      return {};
    }
    return data.items.reduce<TMessagesByDay>((acc, message) => {
      const day = startOfDay(new Date(message.createdAt)).toISOString();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(message);
      return acc;
    }, {});
  }, [data?.items]);

  if (error || !data) {
    return [isLoading, [], {}];
  }

  return [isLoading, data?.items, messagesByDay];
};

export const useToggleDisabledChat = (messages: IChatById[]): boolean | null => {
  const isAnonymous = messages.length ? !messages[0]?.sender?.phoneNumber : null;

  useEffect(() => {
    if (!messages.length) {
      return;
    }
    (async () => {
      const chatWidget = await getWidget();
      if (isAnonymous) {
        chatWidget.toggleInputDisabled();
      }
    })();
    return () => {
      (async () => {
        const chatWidget = await getWidget();
        if (isAnonymous) {
          chatWidget.toggleInputDisabled();
        }
      })();
    };
  }, [messages, isAnonymous]);

  return isAnonymous;
};
