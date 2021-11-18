<template>
  <button
    :disabled="disabled"
    :class="[
      'button',
      { 'button--not-disabled': !disabled }
    ]"
    :type="type"
  >
    <slot>
      <span>{{ text }}</span>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VButton',

  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'button' },
  },
});
</script>

<style scoped lang="scss">
.button {
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-h2);
  color: var(--color-white);
  border: none;
  border-radius: 6px;
  background-color: var(--color-primary);
  outline: none;
  cursor: pointer;
  transition: all 300ms;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:not(:disabled) {
    &:focus { box-shadow: var(--shadow-focused); }
    &:active { box-shadow: var(--shadow-activated); }
  }
}

// this implementation is in question
.button.button_shadow {
  box-shadow: var(--shadow-2);

  &:not(:disabled) {
    &:focus { box-shadow: var(--shadow-2), var(--shadow-focused); }
    &:active { box-shadow: var(--shadow-2), var(--shadow-activated); }
  }
}
</style>
