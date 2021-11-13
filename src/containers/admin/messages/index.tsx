import React, { useState } from 'react';
import { Filter } from '@containers/admin/messages/filter';
// import { Checkbox } from '@components/checkbox';
// @ts-ignore
import { MessagesTable } from '@containers/admin/messages/table';
// import { useRouter } from "next/router";
import { SearchInput } from '@components/input/search';
import styles from './messages.module.scss';
import Admin from '../../../layouts/admin';

export const MOCK: {
  criterians: string, message: string, user: string, id: number,
}[] = [
  {
    id: 1, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
  {
    id: 2, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
  {
    id: 3, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: '+375298265917',
  },
  {
    id: 4, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
  {
    id: 5, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
  {
    id: 6, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
  {
    id: 7, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: '+375298074017',
  },
  {
    id: 8, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
  {
    id: 9, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
  {
    id: 10, criterians: 'Food problems, плохой сервис', message: 'Невежливые официанты, длительное обслуживание', user: 'Аноним',
  },
];

enum MESSAGE_FILTER {
  all= 'all',
  anonymously = 'anonymously',
  nonAnonymously = 'nonAnonymously',
}
const FILTER_OPTIONS = [
  { key: MESSAGE_FILTER.all, value: 'Все' },
  { key: MESSAGE_FILTER.anonymously, value: 'Анонимно' },
  { key: MESSAGE_FILTER.nonAnonymously, value: 'Неанонимно' },
];

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
