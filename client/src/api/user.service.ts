import { AxiosResponse } from 'axios';
import { IUserPatch, IUserPatchPassword } from 'common/model/user';
import { request } from '@/api/http';

export const userService = {
  validateUsername: (username: string) => request()
    .get('user/validate/username', { params: { username } })
    .then((res: AxiosResponse) => res.data),

  validateEmail: (email: string) => request()
    .get('user/validate/email', { params: { email } })
    .then((res: AxiosResponse) => res.data),

  getProfileData: () => request()
    .get('user/me')
    .then((res: AxiosResponse) => res.data),

  updateUser: (userData: IUserPatch) => request()
    .patch('user', userData)
    .then((res: AxiosResponse) => res.data),

  updatePassword: (passwords: IUserPatchPassword) => request()
    .patch('user/password', passwords)
    .then((res: AxiosResponse) => res.data),
};
