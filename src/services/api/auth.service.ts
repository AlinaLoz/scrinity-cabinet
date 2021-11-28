import { SIGN_IN_API, SIGN_OUT_API } from '@constants/api.constants';
import { post } from '@helpers/axios.helpers';

export function signInAPI(data: { login: string, password: string }): Promise<void> {
  return post(SIGN_IN_API, data);
}

export function signOutAPI(): Promise<void> {
  return post(SIGN_OUT_API);
}
