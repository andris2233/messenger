<template>
  <form class="form" @submit.prevent="onSubmit">
    <VInput
      v-model:value="form.login"
      label="Email / Username"
      class="input_shadow"
    />

    <VInput
      v-model:value="form.password"
      label="Password"
      type="password"
      class="input_shadow"
    />

    <div class="form__buttons mt-32">
      <VButton
        :disabled="!canLogin"
        text="Sign in"
        type="submit"
        class="button_shadow"
      />

      <VButton
        text="Haven't got an account? Register here"
        class="button_shadow mt-8 button_link"
        @click.prevent="$router.push({ name: 'SignUp' })"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { IUserSignInForm } from '@/models/user';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

/*#region SingIn*/
const setupSingIn = () => {
  const store = useStore();
  const router = useRouter();

  const form = reactive<IUserSignInForm>({ login: '', password: '' });

  const canLogin = computed(() => Object.values(form).every((field) => !!field));

  const tokens = computed(() => store.state.user.tokens);

  const onSubmit = async () => {
    await store.dispatch('user/signIn', form);

    if (tokens.value.accessToken) {
      await router.push({ name: 'Profile' });
    }
  };

  return {
    form,
    canLogin,
    tokens,
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
  margin-top: 53.59px + 14px; // height of VInput with gap
  display: flex;
  flex-direction: column;
  gap: 14px;

  .form__buttons {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
}

.button_link ::v-deep span {
  font-size: var(--font-size-h3);
}
</style>
