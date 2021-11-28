import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

import { PROJECT_NAME } from '@constants/global.constants';
import { Input } from '@components/input/simple';
import Button from '@components/button';
import { useSignIn } from '@components/modal/sign-in.modal/sign-in.hooks';
import { ROUTES } from '@constants/routes.contstants';
import { ME_API } from '@constants/api.constants';
import styles from './sign-in.module.scss';

export const SignInModal: React.FC = () => {
  const router = useRouter();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, error, resetError, signIn] = useSignIn();

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSuccess = await signIn({ login, password });
    mutate(ME_API);
    if (isSuccess) {
      router.push(ROUTES.INDEX, ROUTES.INDEX);
    }
  };

  const onChangeLogin = (value: string) => {
    resetError();
    setLogin(value);
  };
  const onChangePassword = (value: string) => {
    resetError();
    setPassword(value);
  };

  return (
    <Modal
      isOpen
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      className={styles.modal}
    >
      <form onSubmit={(e) => onSubmitForm(e)}>
        <div className={styles.header}>
          <div className={styles.projectName}>{PROJECT_NAME}</div>
          <div className={styles.description}>Введите ваш логин и пароль</div>
        </div>
        <Input
          className={styles.login}
          placeholder="Введите логин"
          label="логин"
          id="login"
          value={login}
          onChangeValue={onChangeLogin}
        />
        <Input
          type="password"
          className={styles.password}
          placeholder="Введите пароль"
          label="пароль"
          id="password"
          value={password}
          onChangeValue={onChangePassword}
        />
        <Button
          disabled={!login.length || !password.length}
          isLoading={isLoading}
          isFluid
          type="blue"
          onClick={onSubmitForm}
        >
          Войти
        </Button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </Modal>
  );
};
