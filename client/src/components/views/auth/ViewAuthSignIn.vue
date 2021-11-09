<template>
  <form class="form" @submit.prevent="onSubmit">
    <VInput
      v-model="form.login"
      label="Email / Username"
    />

    <VInput
      v-model="form.password"
      label="Password"
      type="password"
    />

    <VButton class="mt-16" title="Sign in" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { mapActions } from 'vuex';
import { IUserSignInForm } from '@/models/user';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

const userActions = mapActions('user', ['signIn']);

/*#region SingIn*/
const setupSingIn = () => {
  const form: Ref<IUserSignInForm> = ref<IUserSignInForm>({ login: '', password: '' });

  const onSubmit = () => {
    userActions.signIn(form);
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
