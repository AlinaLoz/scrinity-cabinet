import React, { useState } from 'react';

import { SearchInput } from '@components/input/search';
import Admin from '@layouts/admin';
import { SENDER_FILTER_OPTIONS } from '@constants/message.constants';
import { MessagesTable } from './table';
import { Filter } from './filter';
import styles from './messages.module.scss';
import { useFilter } from './hooks';

export const AdminMessages: React.FC = () => {
  const { sender, onChange } = useFilter();
  const [search, setSearch] = useState('');

  return (
    <Admin>
      <SearchInput
        className={styles.fullScreenSearch}
        value={search}
        onChange={setSearch}
        placeholder="Найти контакт"
      />
      <main className={styles.main}>
        <SearchInput
          className={styles.mobileSearch}
          value={search}
          onChange={setSearch}
          placeholder="Найти контакт"
        />
        <Filter
          label="Контакты:"
          options={SENDER_FILTER_OPTIONS}
          value={sender}
          onChange={(value) => onChange('sender', value)}
        />
        <MessagesTable />
      </main>
    </Admin>
  );
};
