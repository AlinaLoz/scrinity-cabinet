import React from 'react';
import { NextPageContext } from 'next';

import { AdminMessages } from '@containers/admin/messages';
import { AVAILABLE_COMPANIES } from '@components/protected-route';

const AdminIndexPage = () => <AdminMessages />;

AdminIndexPage.getInitialProps = (ctx: NextPageContext) => {
  if (!AVAILABLE_COMPANIES.includes(ctx?.query?.company as string)) {
    return {
      notFound: true,
    };
  }
  return {};
};
export default AdminIndexPage;
