// eslint-disable-next-line import/extensions,import/no-unresolved
import { IUserCreate } from '@@/model/user';
import { AxiosInstance, AxiosResponse } from 'axios';
import { isEmail, isUsername } from '@/helpers/validation/validators';

const BASE_URL = process.env.VUE_APP_API_ENDPOINT;

const auth = (axios: AxiosInstance) => ({
  registerUser(userData: IUserCreate) {
    return axios
      .post(`${BASE_URL}/auth/registration`, userData)
      .then((response: AxiosResponse) => response.data);
  },
  signIn(login: string, password: string) {
    const userData: { email?: string, username?: string, password: string } = {
      password,
    };

    if (isEmail(login)) userData.email = login;
    if (isUsername(login) && !isEmail(login)) userData.username = login;

    return axios
      .post(`${BASE_URL}/auth/login`, userData)
      .then((response: AxiosResponse) => response.data);
  },
});

export default auth;
