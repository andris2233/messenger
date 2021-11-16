import { AxiosResponse } from 'axios';
import store from '@/store/index';
import { request } from '@/api/http';

export const userService = {
  validateUsername: (username: string) => request()
    .get('user/validate/username', { params: { username } })
    .then((res: AxiosResponse) => res.data),

  validateEmail: (email: string) => request()
    .get('user/validate/email', { params: { email } })
    .then((res: AxiosResponse) => res.data),

  getProfileData: () => request()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .get('user/me', { headers: { Authorization: `Bearer ${store.state.user.tokens.accessToken}` } })
    .then((res: AxiosResponse) => res.data),
};
