<template>
  <form class="form" @submit.prevent="onSubmit">
    <VInput
      v-model:value="form.login"
      label="Email / Username"
      class="shadow"
    />

    <VInput
      v-model:value="form.password"
      label="Password"
      type="password"
      class="shadow"
    />

    <VButton :disabled="!canLogin" class="shadow mt-32" text="Sign in" />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { IUserSignInForm } from '@/models/user';
import store from '@/store/index';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

/*#region SingIn*/
const setupSingIn = () => {
  const form = reactive<IUserSignInForm>({ login: '', password: '' });

  const canLogin = computed(() => Object.values(form).every((field) => !!field));

  const onSubmit = () => {
    store.dispatch('user/signIn', form);
  };

  return {
    form,
    canLogin,
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
  margin-top: 53px + 14px; // height of VInput with gap
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
