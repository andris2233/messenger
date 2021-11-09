<template>
  <form class="form" @submit.prevent="onSubmit">
    <VInput
      v-model:value="form.email"
      label="Email"
    />

    <VInput
      v-model:value="form.username"
      label="Username"
    />

    <VInput
      v-model:value="form.password"
      label="Password"
      type="password"
    />

    <VButton title="Sign up" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { IUserCreate } from 'common/model/user';
import store from '@/store/index';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

/*#region SingUp*/
const setupSingUp = () => {
  const form = reactive<IUserCreate>({ email: '', username: '', password: '' });

  const onSubmit = () => {
    store.dispatch('user/signUp', form);
  };

  return {
    form,
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
  gap: 10px;
}
</style>
