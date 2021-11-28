import React from 'react';
import cn from 'classnames';

import { CustomTable } from '@components/table';
// import { Checkbox } from '@components/checkbox';
// import { TrashIcon } from '@components/icons/trash';
import { Chat } from '@containers/admin/chat';
import { useChat } from './hooks';
import styles from './table.module.scss';

interface IMessagesTableProps {
  items: { id: number, message: string, user: string, criterians: string }[],
}

export const MessagesTable: React.FC<IMessagesTableProps> = ({ items }) => {
  // const itemsIds = useMemo(() => items.map(({ id }) => id), [items]);
  // const [checkedCheckboxes, onChangeCheckbox, onSelectAllCheckboxes] = useCheckboxes(itemsIds);
  const [chat, setChat] = useChat();

  const onOpenChatWrapper = (id: number) => {
    setChat(id);
  };

  return (
    <div className={styles.wrapper}>
      <CustomTable
        className={cn(styles.customTable, { [styles.fullTable]: chat === null })}
        pageCount={10}
        thead={(
          <tr>
            <th className={styles.checkboxRaw}>
              {/* <Checkbox */}
              {/*  id={-1} */}
              {/*  value={checkedCheckboxes.length === items.length} */}
              {/*  onChange={onSelectAllCheckboxes} */}
              {/* /> */}
            </th>
            <th>
              Имя/телефон
            </th>
            <th>Описание</th>
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
            <td onClick={() => onOpenChatWrapper(row.id)}>{row.user}</td>
            <td onClick={() => onOpenChatWrapper(row.id)}>{row.message}</td>
            <td onClick={() => onOpenChatWrapper(row.id)}>{row.criterians}</td>
            {/* <td className={styles.trashRaw}><TrashIcon /></td> */}
          </tr>
        ))}
      />
      {chat !== null && <Chat feedbackId={chat} />}
    </div>
  );
};
