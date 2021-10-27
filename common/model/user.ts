export interface IUserCreate {
  email: string;
  password: string;
  nickname: string;
}

export interface IUser {
  id: number;

  email: string;
  nickname: string;

  firstName: string;
  lastName: string;

  idPrivate: boolean;
}
