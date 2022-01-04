import React from 'react';

import Admin from '../../../layouts/admin';
import { FeedbackAnalytics } from './feedback-analytics';
import styles from './graphics.module.scss';

export const AdminGraphics: React.FC = () => (
  <Admin>
    <main className={styles.main}>
      <FeedbackAnalytics />
    </main>
  </Admin>
);
