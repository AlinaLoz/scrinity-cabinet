import React from 'react';

import { Chat } from '@containers/admin/chat';
import { useChatIdFromRoute, useOpenChat, } from './hooks';
import { useChats } from '../hooks';
import { MessageTable } from '../table';
import { ListMessages } from '../list';
import styles from './content.module.scss';

interface IMessagesContentProps {
  className?: string;
}
export const MessagesContent: React.FC<IMessagesContentProps> = ({ className }) => {
  const [chatId] = useChatIdFromRoute();
  const [isLoadingChats] = useChats();
  
  return (
    <div className={styles.messagesContent}>
      {isLoadingChats && <p>Loading</p>}
      {!chatId ? (
        <MessageTable />
      ) : (
        <div className={styles.chatContent}>
          <ListMessages className={styles.listMessages} />
          <Chat className={styles.chat} />
        </div>
      )}
    </div>
  );
};
