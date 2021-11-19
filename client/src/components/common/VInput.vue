<template>
  <div class="input">
    <div class="input__label" @click="$refs.input.focus()">
      <slot name="label">
        <span>{{ label }}</span>
      </slot>

      <div class="input__row">
        <button
          v-if="$slots['icon-left']"
          class="input__icon-button"
          @click.stop="$emit('left-icon-click')"
        >
          <slot name="icon-left" />
        </button>

        <input
          ref="input"
          :value="value"
          :type="type"
          :placeholder="placeholder"
          class="input__text-field"
          @input="$emit('update:value', $event.target.value)"
          @keydown="$emit('keydown', $event)"
        >

        <button
          v-if="$slots['icon-right']"
          class="input__icon-button"
          @click.stop="$emit('right-icon-click')"
        >
          <slot name="icon-right" />
        </button>
      </div>
    </div>

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

  emits: ['update:value', 'keydown', 'left-icon-click', 'right-icon-click'],
});
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;

  .input__row {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 6px 10px;
    height: 36px;
    background: var(--color-lightest-gray);
    border-radius: 6px;

    .input__icon-button {
      padding: 0;
      margin: 0;
      width: min-content;
      height: min-content;
      display: flex;
      justify-content: center;
      align-items: center;

      border: none;
      outline: none;
      background: none;
    }
  }

  .input__label > span{
    display: flex;
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-regular);
  }

  .input__text-field {
    display: flex;
    width: 100%;
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-regular);
    background: none;
    border: none;
    outline: none;
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
.input.input_shadow .input__row {
  box-shadow: var(--shadow-2);
}
.input.input_white .input__label span{
  color: var(--color-white);
}
.input.input_large .input__row {
  padding-left: 16px;
  height: 46px;
}
</style>
