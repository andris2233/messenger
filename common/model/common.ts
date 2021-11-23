export interface ISearchQuery {
  search: string;
  page?: string | number;
  size: string | number;
}

export interface ISocketMsg<T> {
  accessToken: string;
  msg: T;
}
