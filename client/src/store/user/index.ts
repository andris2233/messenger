import { parseJwt } from '@/auth/parseJwt';
import $api from '@/services/index';

// eslint-disable-next-line import/prefer-default-export
export const user = {
  state: () => ({
    authData: {},
    tokens: {},
  }),
  mutations: {
    getAuthDataFromJwt(state: any, payload: any) {
      state.authData = parseJwt(payload);
    },
    setTokens(state: any, tokens: any) {
      state.tokens = tokens;
    },
  },
  actions: {
    async registerUser({ commit }: { commit: any }, payload: any) {
      const tokens: { accessToken: string, refreshToken: string } = await $api.auth.registerUser(payload);
      commit('setTokens', tokens);
      commit('getAuthDataFromJwt', tokens.accessToken);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    },
    async signInUser({ commit }: { commit: any }, payload: any) {
      const { login, password } = payload;
      const tokens: { accessToken: string, refreshToken: string } = await $api.auth.signIn(login, password);
      commit('setTokens', tokens);
      commit('getAuthDataFromJwt', tokens.accessToken);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    },
  },
};
