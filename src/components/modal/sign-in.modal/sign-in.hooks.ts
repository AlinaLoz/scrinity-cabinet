import { getFirstResponseError } from '@helpers/message.helper';
import {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';

type TUseRequestNewCodeReturn = [
  boolean,
  string,
  Dispatch<SetStateAction<string>>,
  (phone: string, cb: () => void) => Promise<void>,
];
export const useRequestNewCode = (): TUseRequestNewCodeReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const cb = useCallback((phone: string, func: () => void) => {
    try {
      setIsLoading(true);
      func();
    } catch (err) {
      setError(getFirstResponseError(err));
    }
    setIsLoading(false);
  }, []);
  return [isLoading, error, setError, cb];
};
