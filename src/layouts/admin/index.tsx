import React, { useState } from 'react';
import Sidebar from '@components/sidebar';
import AdminNavbar from '@components/navbar';
import styles from './admin.module.scss';

const Admin: React.FC = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleSidebar = (value: boolean) => {
    setIsToggled(value);
  };

  return (
    <div className={styles.app}>
      <Sidebar
        isToggled={isToggled}
        handleToggleSidebar={handleToggleSidebar}
      />
      <main className={styles.main}>
        <AdminNavbar handleToggleSidebar={handleToggleSidebar} />
        {children}
      </main>
    </div>
  );
};

export default Admin;
