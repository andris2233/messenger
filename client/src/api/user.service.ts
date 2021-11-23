import { AxiosResponse } from 'axios';
import { ISearchQuery } from 'common/model/common';
import { request } from '@/api/http';

export const userService = {
  validateUsername: (username: string) => request()
    .get('/user/validate/username', { params: { username } })
    .then((res: AxiosResponse) => res.data),

  validateEmail: (email: string) => request()
    .get('/user/validate/email', { params: { email } })
    .then((res: AxiosResponse) => res.data),

  getProfileData: () => request()
    .get('/user/me')
    .then((res: AxiosResponse) => res.data),

  getUsers: (query: ISearchQuery) => request()
    .get('/user', { params: query })
    .then((res) => res.data),
};
