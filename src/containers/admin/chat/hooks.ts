import useSWR from 'swr';
import { CHAT_BY_ID_API } from '@constants/api.constants';
import { getChatByIdAPI, sendMessageAPI } from '@api/chats.service';
import { IChatById, ISendMessageRequest } from '@interfaces/chats.interfaces';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useMe } from '@hooks/use-me.hooks';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { COMPANY_ROUTE, ROUTES } from '@constants/routes.contstants';
import { useRouter } from 'next/router';
import { startOfDay } from 'date-fns';
import { useChatIdFromRoute } from '@containers/admin/messages/content/hooks';
import { toast } from 'react-toastify';
import { getFirstResponseError } from '@helpers/message.helper';
import { getWidget, sendMessage } from './helpers';

export type TMessagesByDay = Record<string, IChatById[]>;

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

export const useToggleDisabledChat = (messages: IChatById[]): void => {
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
};

export const useChangeOpenedChat = (messages: IChatById[]): void => {
  useEffect(() => {
    if (!messages.length) {
      return;
    }
    (async () => {
      const chatWidget = await getWidget();
      if (!chatWidget.isWidgetOpened()) {
        chatWidget.toggleWidget();
      }
      chatWidget.dropMessages();
    })();
  }, [messages]);
};

export const useUpdateChatMessages = (): [string] => {
  const [, manager] = useMe();
  const [chatId] = useChatIdFromRoute();
  const [, messages, messagesById] = useChat(chatId || 0);
  const formatSender = formatPhoneNumberIntl(messages[0]?.sender?.phoneNumber || '') || 'Аноним';

  useEffect(() => {
    if (!messages.length) {
      return;
    }
    (async () => {
      const entries = Object.entries(messagesById);
      await entries.reduce(async (promise, [day, dayMessages]) => {
        await promise;
        await sendMessage({ createdAt: day, content: '' }, '', 'day');
        await dayMessages.reduce(async (insidePromise, item) => {
          await insidePromise;
          if (manager?.userId === item.sender?.id) {
            await sendMessage(item, 'Вы', 'userMessage');
          } else {
            await sendMessage(item, formatSender, 'response');
          }
          return insidePromise;
        }, Promise.resolve());
        return promise;
      }, Promise.resolve());
    })();
  }, [messages]);

  return [formatSender];
};

export const useSendMessageToBack = (): [(data: ISendMessageRequest) => Promise<void>] => {
  const [, manager] = useMe();

  const cb = useCallback(async (data: ISendMessageRequest) => {
    try {
      await sendMessageAPI(data);
    } catch (err) {
      toast.error(getFirstResponseError(err));
    }
  }, [manager]);
  return [cb];
};

export const useSubmitChat = (newMessage: string): [(event: React.MouseEvent) => Promise<void>] => {
  const router = useRouter();
  const [, manager] = useMe();
  const [chatId] = useChatIdFromRoute();
  const [,, messagesById] = useChat(chatId || 0);
  const [onSendToBack] = useSendMessageToBack();

  const [isTodaySend, setIsTodaySend] = useState(false);

  const onClickWrapper = useCallback(async (event: React.MouseEvent) => {
    if (!manager?.institutionId) {
      return;
    }
    if ((event.target as HTMLButtonElement).classList.contains('rcw-close-button')) {
      const companyMessagesRoute = COMPANY_ROUTE(manager.institutionId.toString(), ROUTES.MESSAGES);
      router.push(companyMessagesRoute);
      return;
    }
    if (chatId && (event.target as HTMLButtonElement).classList.contains('rcw-send')) {
      if (!newMessage?.trim().length) {
        event.preventDefault();
        return;
      }
      const today = startOfDay(new Date()).toISOString();
      if (!isTodaySend && !messagesById[today]) {
        await sendMessage({ createdAt: today, content: '' }, '', 'day');
      }
      await sendMessage({ createdAt: (new Date()).toISOString() }, 'Вы', 'userMessage');
      await onSendToBack({ chatId, message: newMessage.trim() });
      setIsTodaySend(true);
    }
  }, [manager?.institutionId, newMessage, messagesById]);

  return [onClickWrapper];
};
