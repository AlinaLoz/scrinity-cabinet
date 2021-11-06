import React from 'react';
import { CustomError } from '@containers/custom-error';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGUAGE } from '@constants/locales.constants';

export default () => <div>Adminka</div>;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    ...(await serverSideTranslations(context.locale || LANGUAGE.RU)),
  },
});
