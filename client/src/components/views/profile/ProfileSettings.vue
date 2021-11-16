<template>
  <form class="form-profile-settings">
    <VInput
      label="Email"
      class="input_shadow"
    />

    <VInput
      label="Username"
      class="input_shadow"
    />

    <VInput
      label="Name"
      class="input_shadow"
    />

    <VInput
      label="Surname"
      class="input_shadow"
    />

    <VInput
      label="Password"
      type="password"
      class="input_shadow"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import VInput from '@/components/common/VInput.vue';

export default defineComponent({
  name: 'ProfileSettings',
  components: { VInput },
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const userSettings = reactive({});
    Object.assign(userSettings, props.settings);

    return { userSettings };
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
