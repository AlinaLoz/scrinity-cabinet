import React, { useContext } from 'react';

import { ROTES } from '@constants/routes.contstants';
import { useRouter } from 'next/router';
import { UserContext } from '@contexts/user.context';

const isBrowser = () => typeof window !== 'undefined';

export const ProtectedRoutes: React.FC = ({ children }) => {
  const router = useRouter();

  const { userId } = useContext(UserContext);
  const isAuthenticated = !!userId;

  const unprotectedRoutes: string[] = [
    ROTES.SIGN_IN,
  ];

  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push(ROTES.SIGN_IN);
    return (<div />);
  }

  return (
    <>
      {children}
    </>
  );
};
