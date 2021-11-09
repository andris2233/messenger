import { AxiosResponse } from 'axios';
import { request } from '@/services/http';

export const userService = {
  validateUsername: (username: string) => request()
    .get('user/validate/username', { params: { username } })
    .then((res: AxiosResponse) => res.data),

  validateEmail: (email: string) => request()
    .get('user/validate/email', { params: { email } })
    .then((res: AxiosResponse) => res.data),
};
