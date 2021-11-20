import { createContext } from 'react';

export type TUserContext = {
  userId: number | null;
  company: string;
}

export const UserContext = createContext<TUserContext>({
  userId: null,
  company: '',
});
