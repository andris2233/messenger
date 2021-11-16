<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { storage } from '@/_utils/storage';
import { ITokens } from '@/models/user';
import { authService } from '@/services/auth.service';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();

    const setTokenExpirationTime = (exp: number) => {
      setTimeout(async () => {
        try {
          const refreshToken = storage.getItem('refreshToken') as string;
          const newTokens: ITokens = await authService.refresh(refreshToken);

          storage.setItem('accessToken', newTokens.accessToken);
          storage.setItem('refreshToken', newTokens.refreshToken);

          store.commit('user/setTokens', newTokens);
          store.commit('user/getAuthDataFromJwt', newTokens.accessToken);

          setTokenExpirationTime(store.state.user.authData.exp);
        }
        catch (e) {
          console.log(e);
          storage.clear();
        }
      }, exp);
    };

    if (storage.getItem('accessToken')) {
      const tokens: ITokens = {
        accessToken: storage.getItem('accessToken') as string,
        refreshToken: storage.getItem('refreshToken') as string,
      };

      store.commit('user/setTokens', tokens);
      store.commit('user/getAuthDataFromJwt', tokens.accessToken);

      const expirationTime = store.state.user.authData.exp * 1000 - Date.now();

      setTokenExpirationTime(expirationTime);
    }
  },
});
</script>

<style lang="scss">
  @import "~@/assets/style/bootstrap.scss";
</style>
