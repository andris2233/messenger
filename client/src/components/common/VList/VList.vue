<template>
  <div class="list">
    <ListGroup
      v-for="(group, groupI) in groups"
      :key="groupI"
      :group="group"
    >
      <template v-if="$slots.group" #group="props">
        <slot name="group" v-bind="{ ...props, groupI }" />
      </template>

      <template v-if="$slots.item" #item="props">
        <slot name="item" v-bind="{ ...props, group, groupI }" />
      </template>
    </ListGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TListItem, IListGroup } from './types';

import ListGroup from '@/components/common/VList/ListGroup.vue';

export default defineComponent({
  name: 'VList',

  components: { ListGroup },

  props: {
    current: Object as PropType<TListItem>,
    groups: Array as PropType<IListGroup[]>,
  },
});
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
