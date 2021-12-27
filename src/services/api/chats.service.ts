import { get, post } from '@helpers/axios.helpers';
import {
  CHAT_BY_ID_API, CHATS_API, CHATS_MESSAGE_API, SEND_CHATS_IMAGES_API,
} from '@constants/api.constants';
import {
  IGetChatByIdAPIResponse, IGetChatsAPIResponse,
  ISendFeedbackImagesRequest, ISendMessageRequest,
} from '@interfaces/chats.interfaces';
import { ISendFeedbackImagesResponse } from '@interfaces/companies.interfaces';

export function getChatsAPI(data: { skip: number, limit: number, isAnonymously?: boolean }): Promise<IGetChatsAPIResponse> {
  return get(CHATS_API, data);
}

export function getChatByIdAPI(id: number): Promise<IGetChatByIdAPIResponse> {
  return get(CHAT_BY_ID_API(id));
}

export function sendMessageAPI(data: ISendMessageRequest): Promise<void> {
  return post(CHATS_MESSAGE_API, data);
}

export function sendFeedbackImagesAPI(data: ISendFeedbackImagesRequest): Promise<ISendFeedbackImagesResponse> {
  return post(SEND_CHATS_IMAGES_API, data);
}
