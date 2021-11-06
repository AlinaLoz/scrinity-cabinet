import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Modal } from '@components/modal';

import { ModalContext } from '@contexts/modal.context';
import { UserContext } from '@contexts/user.context';
import { useMe } from '@hooks/use-me.hooks';
import { useModal } from '@hooks/use-modal.hooks';
import '../assets/main.scss';

type TWrappedAppProps = AppInitialProps & AppContext;

const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  const [modalType, setModalType, data, setDataWrapper] = useModal();
  // const [userId] = useMe();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </Head>
      <ModalContext.Provider value={{
        data, setModalType, modalType, setData: setDataWrapper,
      }}
      >
        <UserContext.Provider value={{ userId: 1 }}>
          <Modal />
          <Component {...pageProps} />
          ADMINKA
        </UserContext.Provider>
      </ModalContext.Provider>
    </>
  );
};

// @ts-ignore
export default appWithTranslation(WrappedApp);
