import React from 'react';
import cn from 'classnames';

import { CustomTable } from '@components/table';
import { CHATS_LIMIT } from '@constants/chats.constants';
import { useChats } from '@containers/admin/messages/hooks';
import styles from './table.module.scss';
import { CRITERIONS } from './text';
import {useChatIdFromRoute} from "@containers/admin/messages/content/hooks";
import {PageLoader} from "@components/page-loader";

interface IMessageTableProps {
  // onOpenChat: (value: number) => void;
}

export const MessageTable: React.FC<IMessageTableProps> = () => {
  const [isLoading, total, items] = useChats();
  const [, onOpenChat] = useChatIdFromRoute();
  // const itemsIds = useMemo(() => items.map(({ id }) => id), [items]);
  // const [checkedCheckboxes, onChangeCheckbox, onSelectAllCheckboxes] = useCheckboxes(itemsIds);
  
  return isLoading ? <PageLoader/> : (
    <CustomTable
      className={cn(styles.customTable, styles.fullTable)}
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
          <td onClick={() => onOpenChat(row.id)}>{row.phoneNumber || 'Аноним'}</td>
          <td className={styles.message} onClick={() => onOpenChat(row.id)}>{row.message}</td>
          <td onClick={() => onOpenChat(row.id)}>{row.criterion.map((item): string => CRITERIONS[item]).toString()}</td>
          {/* <td className={styles.trashRaw}><TrashIcon /></td> */}
        </tr>
      ))}
    />
  );
};
