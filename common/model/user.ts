export interface IUserCreate {
  email: string;
  password: string;
  username: string;
}

export interface IUser {
  id: number;

  email: string;
  username: string;

  firstName: string;
  lastName: string;

  idPrivate: boolean;
}

export interface IUsersQuery {
  search: string;
  page?: string;
  size: string;
}

export interface IUsersResponse {
  count: number;
  rows: IUser[];
}
