<template>
  <form class="form-profile-settings">
    <VInput
      v-model:value="userData.email"
      label="Email"
    />

    <VInput
      v-model:value="userData.username"
      label="Username"
    />

    <VInput
      v-model:value="userData.firstName"
      label="Name"
    />

    <VInput
      v-model:value="userData.lastName"
      label="Surname"
    />

    <VInput
      label="Password"
      type="password"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, WritableComputedRef, ref, PropType } from 'vue';
import VInput from '@/components/common/VInput.vue';
import { IUserProfile } from '@/models/user';

export default defineComponent({
  name: 'ProfileSettings',

  components: { VInput },

  props: {
    value: { type: Object as PropType<IUserProfile>, default: () => ({}) },
  },

  emits: ['update:value'],

  setup(props) {
    const user = ref({});

    const userData: WritableComputedRef<IUserProfile> = computed({
      get: () => JSON.parse(JSON.stringify(props.value)),
      set: (v: any) => { user.value = v; },
    });

    return { userData };
  },
});
</script>

<style lang="scss" scoped>
.form-profile-settings {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
