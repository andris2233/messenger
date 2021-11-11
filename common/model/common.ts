export interface ISearchQuery {
  search: string;
  page?: string;
  size: string;
}

export interface ISocketMsg<T> {
  accessToken: string;
  msg: T;
}
