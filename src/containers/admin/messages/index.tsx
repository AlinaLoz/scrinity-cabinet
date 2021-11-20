import React, { useState } from 'react';

import { SearchInput } from '@components/input/search';
import Admin from '@layouts/admin';
import { FILTER_OPTIONS, MESSAGE_FILTER } from '@constants/message.constants';
import { MessagesTable } from './table';
import { Filter } from './filter';
import { MOCK } from './mock';
import styles from './messages.module.scss';

export const AdminMessages: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(MESSAGE_FILTER.all);

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
          options={FILTER_OPTIONS}
          value={filter}
          onChange={setFilter}
        />
        <MessagesTable items={MOCK} />
      </main>
    </Admin>
  );
};
