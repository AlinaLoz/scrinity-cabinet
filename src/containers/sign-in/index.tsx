import React, { useEffect } from 'react';

import { SignInModal } from '@components/modal/sign-in.modal';
import { useModal } from '@hooks/use-modal.hooks';
import { MODAL } from '@constants/modal.constants';
import styles from './styles.module.scss';

export const SignIn: React.FC = () => {
  const [, setModalType] = useModal();

  useEffect(() => {
    setModalType(MODAL.SIGN_IN);
  }, []);

  return (
    <div className={styles.wrapper}>
      <SignInModal />
    </div>
  );
};
