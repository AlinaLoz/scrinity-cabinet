import React from 'react';
import { BurgerIcon } from '@components/icons/burger';
import styles from './navbar.module.scss';

interface IAdminNavbarProps {
  handleToggleSidebar: (value: boolean) => void;
}

const AdminNavbar: React.FC<IAdminNavbarProps> = ({ handleToggleSidebar }) => (
  <div className={styles.navbar}>
    <BurgerIcon className={styles.burger} onClick={() => handleToggleSidebar(true)} />

  </div>
);

export default AdminNavbar;
