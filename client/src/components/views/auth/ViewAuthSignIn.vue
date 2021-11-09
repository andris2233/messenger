<template>
  <form class="form" @submit.prevent="onSubmit">
    <VInput
      v-model:value="form.login"
      label="Email / Username"
    />

    <VInput
      v-model:value="form.password"
      label="Password"
      type="password"
    />

    <VButton class="mt-16" title="Sign in" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { IUserSignInForm } from '@/models/user';
import store from '@/store/index';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

/*#region SingIn*/
const setupSingIn = () => {
  const form = reactive<IUserSignInForm>({ login: '', password: '' });

  const onSubmit = () => {
    store.dispatch('user/signIn', form);
  };

  return {
    form,
    onSubmit,
  };
};
/*#endregion SingIn*/

export default defineComponent({
  name: 'ViewAuthSignIn',

  components: { VInput, VButton },

  setup() {
    return {
      ...setupSingIn(),
    };
  },
});
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
