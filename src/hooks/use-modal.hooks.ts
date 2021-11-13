import {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';
import { MODAL } from '@constants/modal.constants';
import { TModalData } from '@contexts/modal.context';

type TSetDataCb<T extends MODAL> = (type: T, data: TModalData<T>) => void;
type TUseModalReturn = [
  MODAL,
  Dispatch<SetStateAction<MODAL>>,
  TModalData<MODAL>,
  TSetDataCb<MODAL>,
];

export const useModal = (): TUseModalReturn => {
  const [modalType, setModalType] = useState(MODAL.NONE);
  const [data, setData] = useState<TModalData<MODAL>>(null);

  const setDataWrapper = useCallback<TSetDataCb<MODAL>>((type, value) => {
    setModalType(type);
    setData(value);
  }, []);

  return [modalType, setModalType, data, setDataWrapper];
};
