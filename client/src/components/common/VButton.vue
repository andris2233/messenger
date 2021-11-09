<template>
  <button
    :disabled="disabled"
    :class="[
      'button',
      { 'button--not-disabled': !disabled }
    ]"
  >
    <slot>
      <span>{{ title }}</span>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VButton',

  props: {
    title: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
});
</script>

<style scoped lang="scss">
.button {
  padding: 6px 10px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-h2);
  color: var(--color-white);
  border: none;
  border-radius: 2px;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: all 300ms;

  &:disabled { opacity: 0.5; }

  &:not(:disabled) {
    &:hover,
    &:active { box-shadow: var(--shadow-focused) }
  }
}
</style>
