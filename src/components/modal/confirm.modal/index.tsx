import React, { useCallback, useContext } from 'react';
import Modal from 'react-modal';

import Button from '@components/button';
import { MODAL } from '@constants/modal.constants';
import { ModalContext, TModalData } from '@contexts/modal.context';
import styles from './confirm.module.scss';

export const ConfirmModal: React.FC = () => {
  const { data, setModalType } = useContext(ModalContext);
  const castData = data as TModalData<MODAL.CONFIRM>;

  const onClickButton = () => {
    castData.cb();
    setModalType(MODAL.NONE);
  };
  const onRequestCloseWrapper = useCallback(() => {
    setModalType(MODAL.NONE);
  }, []);

  return (
    <Modal
      isOpen
      shouldCloseOnOverlayClick
      onRequestClose={onRequestCloseWrapper}
      ariaHideApp={false}
      className={styles.modal}
    >
      <p className={styles.text}>{castData?.text}</p>
      <Button className={styles.button} type="blue" onClick={onClickButton}>Подтвердить</Button>
    </Modal>
  );
};
