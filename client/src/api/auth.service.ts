import { AxiosResponse } from 'axios';
import { IUserCreate, IUserSignIn } from 'common/model/user';
import { isEmail, isUsername } from 'common/utils/validation/validators';
import { request } from '@/api/http';
import { IUserSignInForm } from '@/models/user';

export const authService = {
  signUp: (userData: IUserCreate) => {
    if (!isEmail(userData.email) || !isUsername(userData.username)) {
      return Promise.reject(new Error('Login is not validate as "Email" or "Username"'));
    }

    return request()
      .post('/auth/registration', userData)
      .then((res: AxiosResponse) => res.data);
  },

  signIn: (form: IUserSignInForm) => {
    let userData: IUserSignIn | null = null;

    const _isEmail = isEmail(form.login);
    const _isUsername = isUsername(form.login);

    if (!_isEmail && !_isUsername) {
      return Promise.reject(new Error('Login is not validate as "Email" or "Username"'));
    }

    if (_isEmail) userData = { email: form.login, password: form.password };
    else if (_isUsername) userData = { username: form.login, password: form.password };

    return request()
      .post('/auth/login', userData)
      .then((res: AxiosResponse) => res.data);
  },

  refresh: (token: string) => request()
    .post('/auth/refresh', { refresh: `Bearer ${token}` })
    .then((res: AxiosResponse) => res.data),
};
