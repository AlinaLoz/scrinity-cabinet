import { get } from '@helpers/axios.helpers';
import { CHATS_API } from '@constants/api.constants';
import { GetChatsAPIResponse } from '@interfaces/chats.interfaces';

export function getChatsAPI(data: { skip: number, limit: number, isAnonymously?: boolean }): Promise<GetChatsAPIResponse> {
  return get(CHATS_API, data);
}
