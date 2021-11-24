export type IUserSignIn = {
  password: string;
} & (
  { email: string; username?: never }
  | { email?: never; username: string }
  );

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
  isPrivate?: boolean;
}

export type IUserPatchPassword = {
  oldPassword: string;
  newPassword: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  idPrivate: boolean;
}

export interface IAuthUserResponse {
  id: number,
  email: string,
  username: string,
  exp: number,
  ait: number,
}

export interface IUsersResponse {
  count: number;
  rows: IUser[];
}
