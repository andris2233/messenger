<template>
  <label class="check">
    <input
      type="checkbox"
      :checked="checked"
      class="check__input"
      @change="$emit('update:checked', $event.target.checked)"
    >
    <span class="check__box">
      <transition name="cross-bounce">
        <VIcon
          v-if="checked"
          path="cross"
          with-stroke
          class="check__cross"
        />
      </transition>
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VIcon from '@/components/common/VIcon.vue';

export default defineComponent({
  name: 'VCheckbox',
  components: { VIcon },
  props: {
    label: { type: String, default: '' },
    checked: { type: Boolean },
  },
});
</script>

<style scoped lang="scss">
.check {
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: var(--font-size-h3);
  cursor: pointer;
  user-select: none;

  &__input {
    position: absolute;
    appearance: none;
  }

  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    margin-right: 6px;
    border: 2px solid var(--color-primary);
    border-radius: 6px;
  }

  &__cross {
    width: 80%;
    height: 80%;
  }
}

.cross-bounce-enter-active {
  animation: bounce-in .1s;
}

.cross-bounce-leave-active {
  animation: bounce-in .1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
