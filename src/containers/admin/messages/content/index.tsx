import React from 'react';
import { isMobile } from 'mobile-device-detect';

import { Chat } from '@containers/admin/chat';
import { PageLoader } from '@components/page-loader';
import { useChatIdFromRoute } from './hooks';
import { useChats } from '../hooks';
import { MessageTable } from '../table';
import { ListMessages } from '../list';
import styles from './content.module.scss';

interface IMessagesContentProps {
  className?: string;
}
export const MessagesContent: React.FC<IMessagesContentProps> = () => {
  const [chatId] = useChatIdFromRoute();
  const [isLoadingChats] = useChats();

  return (
    <div className={styles.messagesContent}>
      {isLoadingChats && <PageLoader />}
      {!chatId || isMobile ? (
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
