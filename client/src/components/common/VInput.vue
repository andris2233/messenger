<template>
  <div class="input">
    <label class="input__label">
      <slot name="label">
        <span>{{ label }}</span>
      </slot>

      <input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="input__text-field"
        @input="$emit('update:value', $event.target.value)"
      >
    </label>

    <!-- todo redo so that errors do not change the height of the component -->
    <div class="input__errors">
      <template v-for="(error, errorI) in errors">
        <slot name="input__error" v-bind="{ error, errorI }">
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
.input {
  display: flex;
  flex-direction: column;

  .input__label > span{
    display: flex;
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-regular);
  }

  .input__text-field {
    display: flex;
    padding: 6px 10px;
    width: 100%;
    height: 36px;
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-regular);
    background: var(--color-lightest-gray);
    border: none;
    border-radius: 6px;
    transition: 0.3s all;
    outline: none;

    &:focus {
      box-shadow: 0 0 10px rgba(0, 163, 255, 0.3);
    }
  }

  .input__errors .input__error {
    display: flex;
    margin-top: 6px;
    height: 16px;
    font-size: var(--font-size-h4);
    color: var(--color-error);
  }
}

// this implementation is in question
.input.input_shadow .input__text-field {
  box-shadow: var(--shadow-2);
}
.input.input_white .input__label span{
  color: var(--color-white);
}
</style>
