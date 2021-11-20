import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SSRProvider from 'react-bootstrap/SSRProvider';

import { Modal } from '@components/modal';
import { ModalContext } from '@contexts/modal.context';
import { UserContext } from '@contexts/user.context';
import { useModal } from '@hooks/use-modal.hooks';
import { initLoader } from '@components/page-loader';
import { ProtectedRoutes } from '@components/protected-route';
import 'react-chat-widget/lib/styles.css';

import '../assets/main.scss';

type TWrappedAppProps = AppInitialProps & AppContext;

initLoader();

const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  const router = useRouter();
  const [modalType, setModalType, data, setDataWrapper] = useModal();
  const company = router?.query?.company as string || '';

  return (
    <SSRProvider>
      <div id="page-loader" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </Head>
      <ModalContext.Provider value={{
        data, setModalType, modalType, setData: setDataWrapper,
      }}
      >
        <ProtectedRoutes>
          <UserContext.Provider value={{ userId: 1, company }}>
            <Modal />
            <Component {...pageProps} />
          </UserContext.Provider>
        </ProtectedRoutes>
      </ModalContext.Provider>
    </SSRProvider>
  );
};

export default WrappedApp;
