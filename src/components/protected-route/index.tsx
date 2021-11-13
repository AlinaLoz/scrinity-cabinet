import React, { useContext } from 'react';

import { COMPANY_ROUTE, IS_INDEX_PATH, ROUTES } from '@constants/routes.contstants';
import { useRouter } from 'next/router';
import { UserContext } from '@contexts/user.context';
import { Custom404 } from '@components/404';

const isBrowser = () => typeof window !== 'undefined';

enum COMPANY {
  PUMA = 'puma'
}

// todo сделать урл с бэка
export const AVAILABLE_COMPANIES: string[] = [COMPANY.PUMA];

export const ProtectedRoutes: React.FC = ({ children }) => {
  const router = useRouter();
  const company = router?.query?.company as string || '';

  const { userId } = useContext(UserContext);
  const isAuthenticated = !!userId;

  if (!Object.keys(router.query).length) {
    return (<>{children}</>);
  }
  if (isBrowser()) {
    if (!AVAILABLE_COMPANIES.includes(company)) {
      return (
        <Custom404 />
      );
    }
    // if (!isAuthenticated && !router.pathname.includes(ROUTES.SIGN_IN)) {
    //   router.push(COMPANY_ROUTE(company, ROUTES.SIGN_IN));
    //   return (<div />);
    // }

    if (!isAuthenticated && IS_INDEX_PATH(company, router.asPath)) {
      router.push(COMPANY_ROUTE(company, ROUTES.MESSAGES));
      return (<>{children}</>);
    }
  }

  return (<>{children}</>);
};
