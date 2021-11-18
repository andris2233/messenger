import { IUserCreate } from 'common/model/user';
import { Module } from 'vuex';
import { IUserSignInForm, ITokens, IUserDataToken } from '@/models/user';
import { storage } from '@/_utils/storage';
import { parseJwt } from '@/_utils/parseJwt';
import { authService } from '@/api/auth.service';

interface IUserState {
  authData: IUserDataToken,
  tokens: ITokens,
}

export default <Module<IUserState, any>>{
  namespaced: true,

  state: () => ({
    authData: <IUserDataToken>{},

    tokens: {
      accessToken: storage.getItem('accessToken'),
      refreshToken: storage.getItem('refreshToken'),
    },
  }),

  getters: {
    tokens(state) {
      return state.tokens;
    },

    isAuth: (state) => {
      const { accessToken } = state.tokens;
      const parsedAccessToken = parseJwt(accessToken);

      if (!parsedAccessToken) return false;

      const { exp } = parsedAccessToken;

      return exp * 1000 > Date.now();
    },
  },

  mutations: {
    setAuthDataFromJwt(state, payload: string) { state.authData = parseJwt(payload); },

    setTokens(state, tokens: ITokens) {
      state.tokens = tokens;
      storage.setItem('accessToken', tokens.accessToken);
      storage.setItem('refreshToken', tokens.refreshToken);
    },
  },

  actions: {
    async signUp({ commit }, payload: IUserCreate) {
      const tokens: ITokens = await authService.signUp(payload);

      commit('setTokens', tokens);
      commit('setAuthDataFromJwt', tokens.accessToken);
    },

    async signIn({ commit }, payload: IUserSignInForm) {
      const tokens: ITokens = await authService.signIn(payload);

      commit('setTokens', tokens);
      commit('setAuthDataFromJwt', tokens.accessToken);
    },

    async refreshTokens({ commit }, refreshToken: string) {
      const tokens: ITokens = await authService
        .refresh(refreshToken);

      commit('setTokens', tokens);
      commit('setAuthDataFromJwt', tokens.accessToken);
    },
  },
};
