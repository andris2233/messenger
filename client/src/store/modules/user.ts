import { IUserCreate } from 'common/model/user';
import { IUserSignInForm } from '@/models/user';
import { storage } from '@/_utils/storage';
import { parseJwt } from '@/_utils/parseJwt';
import { authService } from '@/services/auth.service';

export const user = {
  namespaced: true,

  state: () => ({
    authData: {},
    tokens: {},
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
      } = await authService.register(payload);

      commit('setTokens', tokens);
      commit('getAuthDataFromJwt', tokens.accessToken);
      storage.setItem('accessToken', tokens.accessToken);
      storage.setItem('refreshToken', tokens.refreshToken);
    },

    async signIn({ commit }: { commit: any }, payload: IUserSignInForm) {
      const tokens: {
        accessToken: string,
        refreshToken: string,
      } = await authService.signIn(payload);

      commit('setTokens', tokens);
      commit('getAuthDataFromJwt', tokens.accessToken);
      storage.setItem('accessToken', tokens.accessToken);
      storage.setItem('refreshToken', tokens.refreshToken);
    },
  },
};
