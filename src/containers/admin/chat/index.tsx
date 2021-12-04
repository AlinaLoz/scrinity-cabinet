import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Router, useRouter } from 'next/router';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import cn from 'classnames';
import { format } from 'date-fns';

import {useMe} from "@hooks/use-me.hooks";
import { COMPANY_ROUTE, ROUTES } from '@constants/routes.contstants';
import ChatWidget from '@components/chat-widget';
import styles from './styles.module.scss';
import {useChat} from "@containers/admin/chat/hooks";
import { useChatIdFromRoute } from '../messages/content/hooks';
import usePrevious from '@hooks/use-preveous.hooks';

interface IChatProps {
  className?: string;
}

const CustomTimeStampFragment = ({ date, isResponse, sender }: { date: string, isResponse: boolean, sender: string }) => (
  <div className={cn('rcw-timestamp', isResponse ? 'rcw-response' : 'rcw-client')}>
    <p>
      <span className={styles.sender}>{sender}</span>
      <span className={styles.time}>{format(new Date(date), 'HH:mm')}</span>
    </p>
  </div>
);


export const Chat: React.FC<IChatProps> = ({ className }) => {
  const router = useRouter();
  const [, manager] = useMe();
  const [chatId] = useChatIdFromRoute();
  const [, messages] = useChat(chatId || 0);
  const isAnonymous = messages.length ? !messages[0]?.sender?.phoneNumber : null;
  const formatSender = formatPhoneNumberIntl(messages[0]?.sender?.phoneNumber || '') || 'Аноним';
  
  useEffect(() => {
    if (!messages.length) {
      return;
    }
    (async () => {
      const widget = await import('react-chat-widget');
      if (isAnonymous) {
        widget.toggleInputDisabled();
      }
    })();
    return () => {
      (async () => {
        const widget = await import('react-chat-widget');
        if (isAnonymous) {
          widget.toggleInputDisabled();
        }
      })();
    }
  }, [messages, isAnonymous]);
  
  useEffect(() => {
    if (!messages.length) {
      return;
    }
    (async () => {
      const widget = await import('react-chat-widget');
      if (!widget.isWidgetOpened()) {
        widget.toggleWidget();
      }
      widget.dropMessages();
      // todo сгруппировать по дням
      messages.forEach((item) => {
        if (manager?.userId === item.sender?.id) {
          widget.addUserMessage(item.content);
          widget.renderCustomComponent(CustomTimeStampFragment, { date: item.createdAt, isResponse: false, sender: 'Вы' });
        } else {
          widget.addResponseMessage(item.content);
          widget.renderCustomComponent(CustomTimeStampFragment, { date: item.createdAt, isResponse: true, sender: formatSender });
        }
      });
    })();
  }, [messages]);
  
  const handleNewUserMessage = (newMessage: string) => {
    (async () => {
      // Now send the message throught the backend API
      const widget = await import('react-chat-widget');
      widget.renderCustomComponent(CustomTimeStampFragment, { date: Date.now(), isResponse: false, sender: 'Вы' });
    })();
  };

  const onClickWrapper = useCallback((event: React.MouseEvent) => {
    if (!manager?.institutionId) {
      return;
    }
    if ((event.target as HTMLButtonElement).classList.contains('rcw-close-button')) {
      const companyMessagesRoute = COMPANY_ROUTE(manager.institutionId.toString(), ROUTES.MESSAGES);
      router.push(companyMessagesRoute);
    }
  }, [manager?.institutionId]);

  return (
    <div className={cn(styles.wrapper, className)} onClick={(event) => onClickWrapper(event)}>
      <ChatWidget
        showTimeStamp={false}
        showCloseButton
        senderPlaceHolder="Напишите сообщение"
        title={formatSender}
        launcher={() => <div />}
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
};
