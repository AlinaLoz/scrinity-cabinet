import React, { useState } from 'react';
import cn from 'classnames';

import ChatWidget from '@components/chat-widget';
import { PageLoader } from '@components/page-loader';
import {
  useChangeOpenedChat, useChat, useSubmitChat, useToggleDisabledChat, useUpdateChatMessages,
} from './hooks';
import { useChatIdFromRoute } from '../messages/content/hooks';
import styles from './styles.module.scss';

interface IChatProps {
  className?: string;
}

export const Chat: React.FC<IChatProps> = ({ className }) => {
  const [chatId] = useChatIdFromRoute();
  const [isLoadingChat, messages] = useChat(chatId || 0);
  const [newUserMessage, setNewUserMessage] = useState('');

  const isAnonymous = useToggleDisabledChat(messages);
  useChangeOpenedChat(messages);
  const [formatSender] = useUpdateChatMessages();
  const [onSubmitChat] = useSubmitChat(newUserMessage);

  console.log('formatSender', formatSender);
  return isLoadingChat ? <PageLoader /> : (
    <div
      className={cn(styles.wrapper, className, isAnonymous && 'anonymous')}
      onClick={(event) => onSubmitChat(event)}
    >
      <ChatWidget
        /* eslint-disable @typescript-eslint/no-empty-function */
        handleNewUserMessage={() => {}}
        handleTextInputChange={(event) => setNewUserMessage(event.target.value)}
        showTimeStamp={false}
        showCloseButton
        senderPlaceHolder="Напишите сообщение"
        title={formatSender}
        launcher={() => <div />}
      />
    </div>
  );
};
