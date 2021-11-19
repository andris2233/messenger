<template>
  <div class="header">
    <VTabs
      v-model:current="current"
      :items="tabs"
      class="h-100"
    >
      <template #item="{ item }">{{ item.title }}</template>
    </VTabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { HeaderTabItem } from '@/components/single/header/types';
import VTabs from '@/components/common/VTabs/VTabs.vue';

export default defineComponent({
  name: 'TheHeader',

  components: { VTabs },

  props: {
    currentTab: { type: Object as PropType<HeaderTabItem> },
    tabs: { type: Array as PropType<HeaderTabItem[]> },
  },

  emits: ['update:currentTab'],

  setup(props, context) {
    return {
      current: computed({
        set: (v) => context.emit('update:currentTab', v),
        get: () => props.currentTab,
      }),
    };
  },

});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  height: 50px;
}
</style>
