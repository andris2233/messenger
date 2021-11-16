import { IUserCreate } from 'common/model/user';
import { IUserSignInForm, ITokens, IUserDataToken } from '@/models/user';
import { storage } from '@/_utils/storage';
import { parseJwt } from '@/_utils/parseJwt';
import { authService } from '@/api/auth.service';

export const user = {
  namespaced: true,

  state: () => ({
    authData: {} as IUserDataToken,
    tokens: {} as ITokens,
  }),

  mutations: {
    getAuthDataFromJwt(state: any, payload: any) { state.authData = parseJwt(payload); },
    setTokens(state: any, tokens: any) { state.tokens = tokens; },
  },

  actions: {
    async signUp({ commit }: { commit: any }, payload: IUserCreate) {
      const tokens: {
        accessToken: string,
        refreshToken: string,
      } = await authService.signUp(payload);

      commit('setTokens', tokens);
      commit('getAuthDataFromJwt', tokens.accessToken);
      storage.setItem('accessToken', tokens.accessToken);
      storage.setItem('refreshToken', tokens.refreshToken);
    },

    async signIn({ commit }: { commit: any }, payload: IUserSignInForm) {
      const tokens: ITokens = await authService.signIn(payload);

      if (tokens.accessToken) {
        commit('setTokens', tokens);
        commit('getAuthDataFromJwt', tokens.accessToken);

        storage.setItem('accessToken', tokens.accessToken);
        storage.setItem('refreshToken', tokens.refreshToken);
      }
    },
  },
};
