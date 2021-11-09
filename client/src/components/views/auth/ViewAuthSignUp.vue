<template>
  <form class="form" @submit.prevent="onSubmit">
    <VInput
      v-model="form.email"
      label="Email"
    />

    <VInput
      v-model="form.username"
      label="Username"
    />

    <VInput
      v-model="form.password"
      label="Password"
      type="password"
    />

    <VButton title="Sign up" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IUserCreate } from 'common/model/user';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

/*#region SingUp*/
const setupSingUp = () => {
  const form: Ref<IUserCreate> = ref<IUserCreate>({ email: '', username: '', password: '' });

  const onSubmit = () => {
    console.log('SignUp submit');
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
