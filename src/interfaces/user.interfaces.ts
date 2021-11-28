export interface IUser {
  id: number | null;
  name: string;
  surname: string;
  email: string;
  institutionId: number,
  image: {
    filename: string;
  },
}

export interface IGetMeAPIResponse {
  user: IUser | null;
}
