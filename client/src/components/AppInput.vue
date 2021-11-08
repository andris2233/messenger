<template>
  <div class="input-wrapper">
    <label class="label">
      <div v-if="$slots.top" class="label__top">
        <slot name="top" />
      </div>
      <input
        :type="type"
        :placeholder="placeholder"
        class="input"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </label>
    <div v-if="$slots.bottom" class="input-error">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped lang="scss">
.input {
  padding: 5px;
  height: 36px;
  width: 100%;
  font-size: 24px;
  background: #F6F6F6;
  border: 1px solid $color-primary;
  border-radius: 2px;
  outline: none;
  transition: 0.3s all;

  &:focus {
    box-shadow: 0 0 10px rgba(0, 163, 255, 0.3);
  }
}

.label__top {
  font-size: 14px;
}

.input-error {
  height: 16px;
  margin-top: 5px;
  font-size: 14px;
  color: $color-error;
}
</style>
