export interface ISearchQuery {
  search: string | number;
  page?: string | number;
  size: string | number;
}

export interface ISocketMsg<T> {
  accessToken: string;
  msg: T;
}

export interface ISearchOffsetQuery {
  search: string;
  offset: string;
  size: string;
}
