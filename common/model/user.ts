export interface IUserCreate {
  email: string;
  username: string;
  password: string;
}

export type IUserPatch = {
  email?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  idPrivate?: boolean;
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
