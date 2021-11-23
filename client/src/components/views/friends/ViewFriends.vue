<template>
  <div class="friends">
    <VTabs
      v-model:current="currentPage"
      :items="pages" class="friends__tabs"
      disable-underline
    >
      <template #item="{ item }">
        <span class="tab">{{ item.title }}</span>
      </template>
    </VTabs>

    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import VTabs from '@/components/common/VTabs/VTabs.vue';

export default defineComponent({
  name: 'ViewFriends',

  components: { VTabs },

  setup() {
    const pages = reactive([
      { title: 'Friends' },
      { title: 'Incoming request' },
      { title: 'Outgoing request' },
    ]);

    return {
      currentPage: ref(pages[0]),
      pages,
    };
  },
});
</script>

<style lang="scss" scoped>
.friends {
  margin: 0 auto;
  width: 460px;
  display: flex;
  flex-direction: column;

  :deep(.friends__tabs) {
    margin-bottom: 10px;
    height: 40px;

    li.tabs-list__item {
      & > button { padding: 10px !important; }
      &:first-child > button { padding-left: 0 !important; }
      &:last-child > button { padding-right: 0 !important; }
    }

    .tab {
      font-size: var(--font-size-h4);
      white-space: nowrap;
    }
  }
}
</style>
