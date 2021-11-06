import React, { useCallback, useContext, useState } from 'react';
import Modal from 'react-modal';

import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import styles from './sign-in.module.scss';
import { SIGN_IN_STEP } from '../modal.contsants';

export const SignInModal: React.FC = () => {
  const [stepSignIn, setStepSignIn] = useState(SIGN_IN_STEP.REQUEST);
  const [phone, setPhone] = useState('');
  const { setData } = useContext(ModalContext);

  const onNextToVerifyCode = useCallback((phoneNumber: string) => {
    setPhone(phoneNumber);
    setStepSignIn(SIGN_IN_STEP.VERIFY);
  }, []);
  
  const onRequestCloseWrapper = useCallback(() => {
    setData(MODAL.NONE, null);
  }, []);

  return (
    <Modal
      isOpen
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      onRequestClose={onRequestCloseWrapper}
      className={styles.modal}
    >
      login
    </Modal>
  );
};
