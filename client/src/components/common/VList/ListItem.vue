<template>
  <div class="list-item">
    <slot v-bind="{ item }">{{ item }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TListItem } from './types';

export default defineComponent({
  name: 'ListItem',

  props: {
    item: { type: Object as PropType<TListItem>, default: null },
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  padding: 12px 16px;
  width: 100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: var(--color-lightest-gray);
}
</style>
