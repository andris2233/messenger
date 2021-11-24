<template>
  <div class="list-group">
    <div class="list-group__title">
      <slot name="group" v-bind="group">{{ group.title }}</slot>
    </div>

    <div class="list-group__group">
      <ListItem
        v-for="(item, itemI) in group.items"
        :key="itemI"
        :item="item"
        :item-i="itemI"
      >
        <template v-if="$slots.item" #default="props">
          <slot name="item" v-bind="{ ...props, itemI }" />
        </template>
      </ListItem>
    </div>
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
    position: sticky;
    padding: 6px 0;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background: var(--color-white);
    font-size: var(--font-size-h3);
    color: var(--color-gray);
  }

  .list-group__group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
