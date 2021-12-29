import React from 'react';
import cn from 'classnames';

import { CustomTable } from '@components/table';
import { CHATS_LIMIT } from '@constants/chats.constants';
import { useChats } from '@containers/admin/messages/hooks';
import { useChatIdFromRoute } from '@containers/admin/messages/content/hooks';
import { PageLoader } from '@components/page-loader';
import { Badge } from 'reactstrap';
import styles from './table.module.scss';
import { CRITERIONS } from '../../../../assets/criterions';

export const MessageTable: React.FC = () => {
  const [isLoading, total, items] = useChats();
  const [, onOpenChat] = useChatIdFromRoute();
  // const itemsIds = useMemo(() => items.map(({ id }) => id), [items]);
  // const [checkedCheckboxes, onChangeCheckbox, onSelectAllCheckboxes] = useCheckboxes(itemsIds);

  return isLoading ? <PageLoader /> : (
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
            Телефон
          </th>
          <th className={styles.message}>Сообщение</th>
          <th className={styles.criterions}>Криетерии</th>
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
          <td className={styles.criterionsBody} onClick={() => onOpenChat(row.id)}>
            {row.criterion.map((criterion) => (
              <Badge
                pill
                key={criterion}
                className={cn(row.isGood ? 'bg-success' : 'bg-danger', styles.badge)}
              >{CRITERIONS[criterion]}
              </Badge>
            ))}
          </td>
          {/* <td className={styles.trashRaw}><TrashIcon /></td> */}
        </tr>
      ))}
    />
  );
};
