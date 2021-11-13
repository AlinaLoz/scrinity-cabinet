import React, { useCallback, useState } from 'react';
import { CustomTable } from '@components/table';
import { Checkbox } from '@components/checkbox';
import { TrashIcon } from '@components/icons/trash';
import styles from './table.module.scss';

interface IMessagesTableProps {
  items: { id: number, message: string, user: string, criterians: string }[],
}

// const PAGE_SIZE = 20;
export const MessagesTable: React.FC<IMessagesTableProps> = ({ items }) => {
  const [checkedOptions, setCheckedOptions] = useState<number[]>([]);
  const onCheckboxChange = useCallback((feedbackId: number, isAll = false) => {
    // debugger;
    setCheckedOptions((selected) => {
      if (isAll) {
        return !selected.length ? items.map(({ id }) => id) : [];
      }
      if (selected.includes(feedbackId)) {
        return selected.filter((id) => id !== feedbackId);
      }
      selected.push(feedbackId);
      return [...selected];
    });
  }, []);
  const onSelectAllCheckboxes = useCallback(() => {
    onCheckboxChange(-1, true);
  }, []);

  return (
    <CustomTable
      pageCount={10}
      thead={(
        <tr>
          <th className={styles.checkboxRaw}>
            <Checkbox
              value={checkedOptions.length === items.length}
              onChange={onSelectAllCheckboxes}
            />
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
            <Checkbox
              value={checkedOptions.includes(row.id)}
              onChange={() => onCheckboxChange(row.id)}
            />
          </td>
          <td>{row.user}</td>
          <td>{row.message}</td>
          <td>{row.criterians}</td>
          <td className={styles.trashRaw}><TrashIcon /></td>
        </tr>
      ))}
    />
  );
};
