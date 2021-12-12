import { Touchable } from '@components/touchable';
import cn from 'classnames';
import styles from '@containers/admin/messages/list/style.module.scss';
import React from 'react';
import { useChats } from '@containers/admin/messages/hooks';
import { useChatIdFromRoute } from '@containers/admin/messages/content/hooks';

interface IPageProps {
  index: number;
}

export const Page: React.FC<IPageProps> = ({ index }) => {
  const [,, items] = useChats(index * 15, 15);
  const [chatId, onOpenChat] = useChatIdFromRoute();

  return (
    <>
      {items.map((item) => (
        <Touchable
          className={cn(styles.chat, { [styles.active]: chatId === item.id })}
          key={item.id}
          onClick={() => onOpenChat(item.id)}
        >
          <p className={styles.phoneNumber}>{item.phoneNumber || 'Анонимно'}</p>
          <p className={styles.message}>{item.message}</p>
        </Touchable>
      ))}
    </>
  );
};
