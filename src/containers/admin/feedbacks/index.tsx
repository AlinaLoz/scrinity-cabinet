import React from 'react';

import { PLATFORM_OPTIONS } from '@constants/feedbacks.constants';
import { Filter } from '@components/filter';
import Loader from '@components/loader';

import Admin from '../../../layouts/admin';
import styles from './feedbacks.module.scss';
import { useFeedbacks, useFilter } from './feedbacks.hooks';
import { Feedback } from './feedback';

export const AdminFeedbacks: React.FC = () => {
  const { platform, onChange } = useFilter();
  const [isLoading, , feedbacks] = useFeedbacks();

  return (
    <Admin>
      <main className={styles.main}>
        <Filter
          className={styles.filter}
          label="Платформа:"
          options={PLATFORM_OPTIONS}
          value={platform}
          onChange={(value) => onChange(value)}
        />
        {isLoading ? <Loader className={styles.loader} /> : (
          <div className={styles.feedbacks}>
            {feedbacks.map((item) => <Feedback key={item.id} feedback={item} />)}
          </div>
        )}
      </main>
    </Admin>
  );
};
