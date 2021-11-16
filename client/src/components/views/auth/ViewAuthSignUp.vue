<template>
  <form class="form" @submit.prevent="onSubmit">
    <VInput
      :value="form.email"
      label="Email"
      @input="checkValidation($event.target.value, 'email')"
      class="input_shadow"
    />

    <VInput
      :value="form.username"
      label="Username"
      class="input_shadow"
      @input="checkValidation($event.target.value, 'username')"
    />

    <VInput
      v-model:value="form.password"
      label="Password"
      type="password"
      class="input_shadow"
    />

    <div class="form__buttons mt-32">
      <VButton
        :disabled="!canRegister"
        type="submit"
        text="Sign up"
        class="button_shadow"
      />

      <VButton
        text="Already have an account? Sign in here"
        class="button_shadow mt-8 button_link"
        @click.prevent="$router.push({ name: 'SignIn' })"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { IUserCreate } from 'common/model/user';
import debounce from 'lodash/debounce';
import { isEmail, isUsername } from 'common/utils/validation/validators';
import { userService } from '@/api/user.service';
import store from '@/store/index';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

/*#region SingUp*/
const setupSingUp = () => {
  const form = reactive<IUserCreate>({ email: '', username: '', password: '' });

  const isEmailValid = ref(true);
  const isUsernameValid = ref(true);

  const checkValidation = debounce(async (value: string, key: keyof IUserCreate) => {
    form[key] = value;

    if (key === 'email' && isEmail(value)) isEmailValid.value = await userService.validateEmail(value);
    else if (key === 'username' && isUsername(value)) isUsernameValid.value = await userService.validateUsername(value);
  }, 500);

  const canRegister = computed(() => isEmailValid.value && isUsernameValid.value && Object.values(form).every((field) => !!field));

  const onSubmit = () => {
    store.dispatch('user/signUp', form);
  };

  return {
    form,
    checkValidation,
    canRegister,
    onSubmit,
  };
};
/*#endregion SingUp*/

export default defineComponent({
  name: 'ViewAuthSignUp',

  components: { VInput, VButton },

  setup() {
    return {
      ...setupSingUp(),
    };
  },
});
</script>

<style scoped lang="scss">
.form {
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
