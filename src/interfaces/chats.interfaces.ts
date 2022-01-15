export interface IFile {
  filename: string;
  index: number;
}

export interface IChat {
  id: number;
  message: string;
  sender: string;
  isGood: boolean;
  criterion: string[];
  numberOfUnread: number;
  files: IFile[]
  createdAt: string;
}

export interface IGetChatsAPIResponse {
  total: number;
  items: IChat[];
}

export interface ISender {
  id: number;
  phoneNumber: string;
  email: string;
}

export interface IChatById {
  id: number;
  sender: ISender | null;
  content: string;
  createdAt: string;
  files: IFile[];
}

export interface IGetChatByIdAPIResponse {
  items: IChatById[];
}

export interface ISendMessageRequest {
  chatId: number;
  message: string;
  filesKeys: string[];
}

export type ISendFeedbackImagesRequest = FormData;
export interface ISendFeedbackImagesResponse {
  imagesKeys: string[];
}

export enum CHAT_AUTH_TYPE {
  anonymously = 'anonymously',
  byNumber = 'byNumber',
  byEmail = 'byEmail',
}
