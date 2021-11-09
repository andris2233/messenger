<template>
  <div class="wrapper">
    <label class="label">
      <slot name="label">
        <span>{{ label }}</span>
      </slot>

      <input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="input"
        @input="$emit('update:value', $event.target.value)"
      >
    </label>

    <div class="errors">
      <template v-for="(error, errorI) in errors">
        <slot name="error" v-bind="{ error, errorI }">
          <span :key="errorI" class="error">{{ error.message }}</span>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VInput',

  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' },

    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },

    errors: { type: Array, default: () => ([]) },
  },

  emits: ['update:value'],
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;

  .label > span{
    display: flex;
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-regular);
  }

  .input {
    display: flex;
    padding: 5px;
    width: 100%;
    height: 36px;
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-regular);
    background: var(--color-lightest-gray);
    border: 1px solid var(--color-primary);
    border-radius: 2px;
    transition: 0.3s all;
    outline: none;

    &:focus {
      box-shadow: 0 0 10px rgba(0, 163, 255, 0.3);
    }
  }

  .errors > .error {
    display: flex;
    margin-top: 6px;
    height: 16px;
    font-size: var(--font-size-h4);
    color: var(--color-error);
  }
}
</style>
