import { getFirstResponseError } from '@helpers/message.helper';
import {
  useCallback, useContext, useState,
} from 'react';
import { mutate } from 'swr';

import { signInAPI, signOutAPI } from '@api/auth.service';
import { ME_API } from '@constants/api.constants';
import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';

type TUseRequestNewCodeReturn = [
  boolean,
  string,
  () => void,
  (data: { login: string, password: string }) => Promise<boolean>,
];

export const useSignIn = (): TUseRequestNewCodeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const cb = useCallback(async (data: { login: string, password: string }) => {
    try {
      setIsLoading(true);
      await signInAPI(data);
      return true;
    } catch (err) {
      setError(getFirstResponseError(err));
      return false;
    } finally {
      setIsLoading(false);
    }

  }, []);

  const resetError = useCallback(() => {
    setError('');
  }, []);

  return [isLoading, error, resetError, cb];
};

export const useSignOut = (): [() => void] => {
  const { setData } = useContext(ModalContext);

  const cb = useCallback(() => {
    const modalCb = async () => {
      try {
        await signOutAPI();
      } finally {
        await mutate(ME_API);
      }
    };
    const text = 'Вы действительно хотите выйти?';
    setData(MODAL.CONFIRM, { text, cb: modalCb });
  }, []);
  return [cb];
};
