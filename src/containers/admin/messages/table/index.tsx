import React from 'react';
import cn from 'classnames';

import { CustomTable } from '@components/table';
// import { Checkbox } from '@components/checkbox';
// import { TrashIcon } from '@components/icons/trash';
import { Chat } from '@containers/admin/chat';
import { useChats } from '@containers/admin/messages/hooks';
import { CHATS_LIMIT } from '@constants/chats.constants';
import { useChat } from './hooks';
import styles from './table.module.scss';
import { CRITERIONS } from './text';

export const MessagesTable: React.FC = () => {

  // const itemsIds = useMemo(() => items.map(({ id }) => id), [items]);
  // const [checkedCheckboxes, onChangeCheckbox, onSelectAllCheckboxes] = useCheckboxes(itemsIds);
  const [total, items] = useChats();
  const [chat, setChat] = useChat();

  const onOpenChatWrapper = (id: number) => {
    setChat(id);
  };

  return (
    <div className={styles.wrapper}>
      <CustomTable
        className={cn(styles.customTable, { [styles.fullTable]: chat === null })}
        total={total}
        pageSize={CHATS_LIMIT}
        thead={(
          <tr>
            <th className={styles.checkboxRaw}>
              {/* <Checkbox */}
              {/*  id={-1} */}
              {/*  value={checkedCheckboxes.length === items.length} */}
              {/*  onChange={onSelectAllCheckboxes} */}
              {/* /> */}
            </th>
            <th className={styles.name}>
              Имя/телефон
            </th>
            <th className={styles.message}>Описание</th>
            <th>Опции</th>
            <th> </th>
          </tr>
        )}
        tbody={items.map((row) => (
          <tr key={row.id}>
            <td className={styles.checkboxRaw}>
              {/* <Checkbox */}
              {/*  id={row.id} */}
              {/*  value={checkedCheckboxes.includes(row.id)} */}
              {/*  onChange={() => onChangeCheckbox(row.id)} */}
              {/* /> */}
            </td>
            <td onClick={() => onOpenChatWrapper(row.id)}>{row.phoneNumber || 'Аноним'}</td>
            <td onClick={() => onOpenChatWrapper(row.id)}>{row.message}</td>
            <td onClick={() => onOpenChatWrapper(row.id)}>{row.criterion.map((item): string => CRITERIONS[item]).toString()}</td>
            {/* <td className={styles.trashRaw}><TrashIcon /></td> */}
          </tr>
        ))}
      />
      {chat !== null && <Chat feedbackId={chat} />}
    </div>
  );
};
