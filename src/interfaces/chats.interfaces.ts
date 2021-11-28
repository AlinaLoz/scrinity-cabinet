export interface IChat {
  id: number;
  message: string;
  phoneNumber: string;
  isGood: boolean;
  criterion: string[];
}

export interface GetChatsAPIResponse {
  total: number;
  items: IChat[];
}
