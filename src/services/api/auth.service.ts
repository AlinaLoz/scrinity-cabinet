import { SIGN_OUT_API } from '@constants/api.constants';
import { post } from '@helpers/axios.helpers';

export function signOutAPI(): Promise<void> {
  return post(SIGN_OUT_API);
}
