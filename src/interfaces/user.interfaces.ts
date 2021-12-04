export interface IManager {
  id: number | null;
  name: string;
  surname: string;
  email: string;
  institutionId: number,
  userId: number;
  image: {
    filename: string;
  },
}

export interface IGetMeAPIResponse {
  manager: IManager | null;
}
