<template>
  <div class="friends">
    <div class="block-wrapper">
      <VTabs
        v-model:current="currentPage"
        :items="tabs" class="friends__tabs"
        disable-underline
      >
        <template #item="{ item }">
          <span class="tab">{{ item.title }}</span>
        </template>
      </VTabs>
    </div>

    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

import VTabs from '@/components/common/VTabs/VTabs.vue';

export default defineComponent({
  name: 'ViewFriends',

  components: { VTabs },

  setup() {
    const router = useRouter();

    const tabs = reactive([
      { title: 'Friends', route: { name: 'FriendsMain' } },
      { title: 'Incoming requests', route: { name: 'FriendsIncoming' } },
      { title: 'Outgoing requests', route: { name: 'FriendsOutgoing' } },
    ]);

    const currentPage = computed({
      set: (v: any) => router.push({ name: v.route.name }),
      get: () => tabs.find((it) => it.route.name === router.currentRoute.value.name
        || router.currentRoute.value.matched.some((m) => it.route.name === m.name)),
    });

    return {
      currentPage,
      tabs,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.block-wrapper) {
  margin: 0 auto;
  width: 460px;
}

.friends {
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
