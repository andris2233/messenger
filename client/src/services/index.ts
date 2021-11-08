import instance from './instance';
import auth from './auth.service';
import user from './user.service';

export default {
  auth: auth(instance),
  user: user(instance),
};
