<template>
  <div class="header">
    <VTabs
      v-model:current="current"
      :items="items"
      class="h-100"
    >
      <template #item="{ item }">{{ item.title }}</template>
    </VTabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import VTabs from '@/components/common/VTabs/VTabs.vue';

export default defineComponent({
  name: 'TheHeader',

  components: { VTabs },

  setup() {
    const items = reactive([
      { id: 0, title: 'Profile' },
      { id: 1, title: 'Friends' },
      { id: 2, title: 'Messages' },
    ]);
    const current = ref(items[0]);

    return {
      current,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
}
</style>
