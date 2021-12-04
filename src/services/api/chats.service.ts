import { get } from '@helpers/axios.helpers';
import {CHAT_BY_ID_API, CHATS_API} from '@constants/api.constants';
import {IGetChatByIdAPIResponse, IGetChatsAPIResponse} from '@interfaces/chats.interfaces';

export function getChatsAPI(data: { skip: number, limit: number, isAnonymously?: boolean }): Promise<IGetChatsAPIResponse> {
  return get(CHATS_API, data);
}

export function getChatByIdAPI(id: number): Promise<IGetChatByIdAPIResponse> {
  return get(CHAT_BY_ID_API(id));
}
