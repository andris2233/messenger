import router from '@/router';
import { store } from '@/store';

import { request } from '@/api/http';
import { storage } from '@/_utils/storage';

/*#region Request*/
const defaultHeaders = () => {
  const accessToken = storage.getItem('accessToken');

  if (!accessToken) return {};
  return { Authorization: `Bearer ${accessToken}` };
};

request().interceptors.request.use(
  (req) => {
    Object.assign(req.headers, defaultHeaders());
    return req;
  },
);

request().interceptors.response.use(
  (res) => res,
  async (err) => {
    const { status } = err?.response;

    if (status === 401) {
      const { refreshToken } = store.state.user.tokens;

      if (refreshToken) {
        await store.dispatch('user/refreshTokens', refreshToken);

        const res: any = await request()
          .request(err.config)
          .catch((er) => er);

        if (res instanceof Error) await router.push({ name: 'Auth' });
        else return res;
      }
    }

    return Promise.reject(err);
  },
);
/*#endregion Request*/

/*#region Router*/
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;

  if (to.meta.auth && !store.state.user.tokens.accessToken) next({ name: 'Auth' });
  else next();
});
/*#endregion Router*/
