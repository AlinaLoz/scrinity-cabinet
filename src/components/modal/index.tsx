import React, { useContext } from 'react';

import { MODAL } from '@constants/modal.constants';
import { ModalContext } from '@contexts/modal.context';

import { SignInModal } from './sign-in.modal';
import { ConfirmModal } from './confirm.modal';

export const Modal: React.FC = () => {
  const { modalType } = useContext(ModalContext);
  if (modalType === MODAL.SIGN_IN) {
    return <SignInModal />;
  }
  if (modalType === MODAL.CONFIRM) {
    return <ConfirmModal />;
  }
  return null;
};
