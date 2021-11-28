import React from 'react';

import { COMPANY_ROUTE, ROUTES } from '@constants/routes.contstants';
import { useRouter } from 'next/router';
import { useMe } from '@hooks/use-me.hooks';

const isBrowser = () => typeof window !== 'undefined';

export const ProtectedRoutes: React.FC = ({ children }) => {
  const router = useRouter();
  const [isLoading, user] = useMe();
  const isAuthenticated = !!user?.id;

  if (isBrowser() && !isLoading) {
    if (!isAuthenticated && !router.pathname.includes(ROUTES.SIGN_IN)) {
      router.push(ROUTES.SIGN_IN, ROUTES.SIGN_IN);
      return (<>{children}</>);
    }
    if (isAuthenticated && (router.asPath === ROUTES.INDEX || router.pathname.includes(ROUTES.SIGN_IN))) {
      router.push(COMPANY_ROUTE((user.institutionId).toString(), ROUTES.MESSAGES));
      return (<>{children}</>);
    }
  }

  return (<>{children}</>);
};
