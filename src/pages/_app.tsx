import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import SSRProvider from 'react-bootstrap/SSRProvider';

import { Modal } from '@components/modal';
import { ModalContext } from '@contexts/modal.context';
import { useModal } from '@hooks/use-modal.hooks';
import { initLoader } from '@components/page-loader';
import { ProtectedRoutes } from '@components/protected-route';
import { useMe } from '@hooks/use-me.hooks';

import 'react-toastify/dist/ReactToastify.css';
import '../assets/main.scss';
import { usePushNotifications } from '@hooks/use-push-notifications.hooks';

type TWrappedAppProps = AppInitialProps & AppContext;

initLoader();

// TODO посмтотреть в проекте пикселя, как работать с модалками
const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  const [modalType, setModalType, data, setDataWrapper] = useModal();
  useMe();
  usePushNotifications();

  return (
    <SSRProvider>
      <div id="page-loader" />
      <Head>
        <title>Кабинет Scrinity</title>
        <link rel="icon" href="/images/scrinity-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </Head>
      <ModalContext.Provider value={{
        data, setModalType, modalType, setData: setDataWrapper,
      }}
      >
        <ProtectedRoutes>
          <Modal />
          <Component {...pageProps} />
        </ProtectedRoutes>
      </ModalContext.Provider>
    </SSRProvider>
  );
};

export default WrappedApp;
