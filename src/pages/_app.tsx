import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import { Modal } from '@components/modal';

import { ModalContext } from '@contexts/modal.context';
import { UserContext } from '@contexts/user.context';
import { useModal } from '@hooks/use-modal.hooks';
import { ProtectedRoutes } from '@components/protected-route';

import '../assets/main.scss';

type TWrappedAppProps = AppInitialProps & AppContext;

const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  const [modalType, setModalType, data, setDataWrapper] = useModal();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </Head>
      <ModalContext.Provider value={{
        data, setModalType, modalType, setData: setDataWrapper,
      }}
      >
        <ProtectedRoutes>
          <UserContext.Provider value={{ userId: 1 }}>
            <Modal />
            <Component {...pageProps} />
          </UserContext.Provider>
        </ProtectedRoutes>
      </ModalContext.Provider>
    </>
  );
};

export default WrappedApp;
