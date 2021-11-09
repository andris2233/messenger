import { AxiosResponse } from 'axios';
import { IUserCreate, IUserSignIn } from 'common/model/user';
import { isEmail, isUsername } from 'common/utils/validation/validators';
import { request } from '@/services/http';
import { IUserSignInForm } from '@/models/user';

export const authService = {
  register: (userData: IUserCreate) => request()
    .post('/auth/registration', userData)
    .then((res: AxiosResponse) => res.data),

  signIn: (form: IUserSignInForm) => {
    let userData: IUserSignIn | null = null;

    if (isEmail(form.login)) userData = { email: form.login, password: form.password };
    else if (isUsername(form.login)) userData = { username: form.login, password: form.password };

    return request()
      .post('/auth/login', userData)
      .then((res: AxiosResponse) => res.data);
  },
};
