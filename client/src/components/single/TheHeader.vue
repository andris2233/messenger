<template>
  <div class="header">
    <VTabs
      v-model:current="current"
      :items="items"
      class="h-100"
      @click="selectView"
    >
      <template #item="{ item }">{{ item.title }}</template>
    </VTabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import VTabs from '@/components/common/VTabs/VTabs.vue';

export default defineComponent({
  name: 'TheHeader',

  components: { VTabs },

  setup() {
    const router = useRouter();

    const items = reactive([
      { id: 0, title: 'Profile' },
      { id: 1, title: 'Friends' },
      { id: 2, title: 'Messages' },
    ]);
    const current = ref(items[0]);

    const selectView = () => {
      router.push({ name: current.value.title });
    };

    return {
      current,
      items,
      selectView,
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
