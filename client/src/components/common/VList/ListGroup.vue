<template>
  <div class="list-group">
    <span class="list-group__title">
      <slot name="group" v-bind="group">{{ group.title }}</slot>
    </span>

    <ListItem
      v-for="(item, itemI) in group.items"
      :key="itemI"
      :item="item"
      :item-i="itemI"
      class="mt-10"
    >
      <template v-if="$slots.item" #default="props">
        <slot name="item" v-bind="{ ...props, itemI }" />
      </template>
    </ListItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IListGroup } from './types';

import ListItem from '@/components/common/VList/ListItem.vue';

export default defineComponent({
  name: 'ListGroup',

  components: { ListItem },

  props: {
    group: { type: Object as PropType<IListGroup> },
  },
});
</script>

<style lang="scss" scoped>
.list-group {
  .list-group__title {
    font-size: var(--font-size-h3);
    color: var(--color-gray);
  }
}
</style>
