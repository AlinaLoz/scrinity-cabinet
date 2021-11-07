import React, { useContext, useState } from 'react';
import Modal from 'react-modal';

import { ModalContext, TModalData } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { UrlHelper } from '@helpers/url.helper';
import { PROJECT_NAME } from '@constants/global.constants';
import { Input } from '@components/input/simple';
import Button from '@components/button';
import styles from './sign-in.module.scss';

export const SignInModal: React.FC = () => {
  const { data }: { data?: TModalData<MODAL.SIGN_IN> } = useContext(ModalContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal
      isOpen
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      className={styles.modal}
    >
      <div className={styles.header}>
        <div className={styles.companyImage}>
          <img src={UrlHelper.getImageSrc('puma.png')} alt={`company ${data?.company.id.toString() || ''}`} />
        </div>
        <div className={styles.projectName}>{PROJECT_NAME}</div>
        <div className={styles.description}>Введите ваш логин и пароль</div>
      </div>
      <Input
        className={styles.login}
        placeholder="Введите логин"
        label="логин"
        id="login"
        value={login}
        onChangeValue={setLogin}
      />
      <Input
        className={styles.password}
        placeholder="Введите пароль"
        label="пароль"
        id="password"
        value={password}
        onChangeValue={setPassword}
      />
      <Button isFluid type="blue">Войти</Button>
    </Modal>
  );
};
