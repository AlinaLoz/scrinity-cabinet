import React from 'react';

import Admin from '@layouts/admin';
import { SENDER_FILTER_OPTIONS } from '@constants/message.constants';
import { Filter } from './filter';
import styles from './messages.module.scss';
import { useFilter } from './hooks';
import { MessagesContent } from './content';

export const AdminMessages: React.FC = () => {
  const { sender, onChange } = useFilter();
  // const [search, setSearch] = useState('');

  return (
    <Admin>
      {/* <SearchInput */}
      {/*  className={styles.fullScreenSearch} */}
      {/*  value={search} */}
      {/*  onChange={setSearch} */}
      {/*  placeholder="Найти контакт" */}
      {/* /> */}
      <main className={styles.main}>
        {/* <SearchInput */}
        {/*  className={styles.mobileSearch} */}
        {/*  value={search} */}
        {/*  onChange={setSearch} */}
        {/*  placeholder="Найти контакт" */}
        {/* /> */}
        <Filter
          className={styles.filter}
          label="Контакты:"
          options={SENDER_FILTER_OPTIONS}
          value={sender}
          onChange={(value) => onChange('sender', value)}
        />
        <MessagesContent />
      </main>
    </Admin>
  );
};
