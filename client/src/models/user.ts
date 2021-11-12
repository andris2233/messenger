export interface IUserSignInForm {
  login: string;
  password: string;
}

export interface ITokens {
  accessToken: string,
  refreshToken: string,
}

export interface IUserDataToken {
  id: number,
  email: string,
  username: string,
  SCOPE: string,
  iat: number,
  exp: number,
}
