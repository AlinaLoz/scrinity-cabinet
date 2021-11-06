import React from 'react';
import Modal from 'react-modal';

import styles from './sign-in.module.scss';

export const SignInModal: React.FC = () => (
  <Modal
    isOpen
    ariaHideApp={false}
    shouldCloseOnOverlayClick
    className={styles.modal}
  >
    login
  </Modal>
);
