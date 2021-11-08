<template>
  <button :disabled="disabled" :class="{ 'button--not-disabled': !disabled }" class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.button {
  width: 100%;
  padding: 10px;
  background-color: $color-primary;
  border: none;
  border-radius: 2px;
  color: $color-white;
  font-size: 24px;
  cursor: pointer;
  transition: 0.3s all;

  &:disabled {
    opacity: 0.5;
  }
}

.button--not-disabled {
  &:hover,
  &:active {
    box-shadow: 0 0 10px rgba(0, 163, 255, 0.3);
  }
}
</style>
