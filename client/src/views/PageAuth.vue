<template>
  <div class="login">
    <AppLogin>
      <template #formHeader>
        <div class="login__header">
          <AppLogo class="login__logo"/>
          <h2 class="login__title">Messenger</h2>
        </div>
      </template>
      <template #formContent>
        <template v-if="!isRegistration">
          <AppInput v-model="signInForm.login" class="mb-3">
            <template #top>Email / Username</template>
          </AppInput>
          <AppInput v-model="signInForm.password" type="password">
            <template #top>Password</template>
          </AppInput>
        </template>
        <template v-else>
          <AppInput
            :model-value="registrationForm.username"
            class="mb-2"
            @input="debounceInput($event, 'username')"
          >
            <template #top>Username</template>
            <template #bottom>{{ errors.username }}</template>
          </AppInput>
          <AppInput
            :model-value="registrationForm.email"
            class="mb-2"
            @input="debounceInput($event, 'email')"
          >
            <template #top>Email</template>
            <template #bottom>{{ errors.email }}</template>
          </AppInput>
          <AppInput v-model="registrationForm.password" type="password">
            <template #top>Password</template>
          </AppInput>
        </template>
      </template>
      <template #formFooter>
        <AppButton
          :disabled="!canAccessAuth"
          class="login__btn"
          @click.prevent="authUser"
        >
          {{ buttonText }}
        </AppButton>
        <a
          class="login__link"
          @click.prevent="isRegistration = !isRegistration"
        >
          Haven't got an account? Register here.
        </a>
      </template>
    </AppLogin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, ComputedRef } from 'vue';
import _ from 'lodash';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { IUserCreate } from '@@/model/user';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { useRouter } from 'vue-router';
import { isUsername, isEmail } from '@/helpers/validation/validators';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import AppLogin from '@/components/AppLogin.vue';
import AppLogo from '@/components/AppLogo.vue';
import $api from '@/services/index';
import store from '@/store/index';

export default defineComponent({
  name: 'PageAuth',
  components: {
    AppLogo,
    AppLogin,
    AppInput,
    AppButton,
  },
  setup() {
    const router = useRouter();

    const isRegistration = ref<boolean>(false);

    const registrationForm = reactive<IUserCreate>({
      username: '',
      email: '',
      password: '',
    });

    const signInForm = reactive({
      login: '',
      password: '',
    });

    const isValidUsername = ref<boolean>(true);
    const isValidEmail = ref<boolean>(true);

    const errors: ComputedRef<{ email: string, username: string }> = computed(() => ({
      email: !isValidEmail.value ? 'This email is already registered' : '',
      username: !isValidUsername.value ? 'This index is already registered' : '',
    }));

    const canAccessAuth = computed(() => {
      if (isRegistration.value) {
        return !!(isValidEmail.value && isValidUsername.value && registrationForm.password);
      }

      return !!(signInForm.login && signInForm.password);
    });

    const buttonText = computed(() => (isRegistration.value ? 'Sign up' : 'Sign in'));

    const debounceInput = _.debounce(async (e: Event, key: keyof IUserCreate): Promise<void> => {
      registrationForm[key] = (e.target as HTMLInputElement).value;

      if (key === 'username' && isUsername(registrationForm[key])) {
        isValidUsername.value = await $api.user.validateUsername(registrationForm.username);
      } else if (key === 'email' && isEmail(registrationForm[key])) {
        isValidEmail.value = await $api.user.validateEmail(registrationForm.email);
      }
    }, 500);

    const registerUser = () => {
      store.dispatch('registerUser', registrationForm);
    };

    const signInUser = () => {
      store.dispatch('signInUser', signInForm);
    };

    const authUser = () => {
      if (isRegistration.value) registerUser();
      signInUser();

      router.push({ name: 'messenger' });
    };

    return {
      isRegistration,
      registrationForm,
      signInForm,
      debounceInput,
      isValidUsername,
      isValidEmail,
      errors,
      canAccessAuth,
      authUser,
      buttonText,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  width: 460px;
  height: 100vh;
  padding: 30px 50px;
  box-shadow: 0 0 250px 0 #FFFFFF61;
  background-color: $color-messenger-bg;

  &__header {
    margin-top: 170px;
    text-align: center;
    font-size: 24px;
    color: $color-primary;
  }

  &__btn {
    display: block;
  }

  &__link {
    display: block;
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    color: $color-primary;
    cursor: pointer;
  }
}
</style>
