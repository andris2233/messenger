<template>
  <div class="layout">
    <TheHeader
      v-model:current-tab="currentTab"
      :tabs="tabs"
    />

    <div class="layout__content">
      <RouterView v-slot="{ Component }">
        <Transition
          :name="transitionName"
          @after-leave="onTransitionEnd"
        >
          <KeepAlive>
            <Component :is="Component" class="layout__view" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import TheHeader from '@/components/single/header/TheHeader.vue';

export default defineComponent({
  name: 'LayoutMain',

  components: { TheHeader },

  setup() {
    const router = useRouter();

    const transitionName = ref('');
    const onTransitionEnd = () => { transitionName.value = ''; };

    const tabs = reactive([
      { title: 'Profile', route: { name: 'Profile' } },
      { title: 'Friends', route: { name: 'Friends' } },
      { title: 'Messages', route: { name: 'Messages' } },
    ]);

    const currentTab = computed({
      set: (v: any) => {
        const currentTabIndex = tabs
          .findIndex((it) => it.route.name === router.currentRoute.value.name
            || router.currentRoute.value.matched.some((m) => it.route.name === m.name));
        const nextTabIndex = tabs.findIndex((it) => it.route.name === v.route.name);

        transitionName.value = currentTabIndex < nextTabIndex
          ? 'tr-view_left-right'
          : 'tr-view_right-left';

        router.push({ name: v.route.name });
      },
      get: () => tabs.find((it) => it.route.name === router.currentRoute.value.name
        || router.currentRoute.value.matched.some((m) => it.route.name === m.name)),
    });

    return {
      currentTab,
      tabs,
      transitionName,
      onTransitionEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  perspective: 2000px;
  overflow: hidden;

  .layout__content {
    position: relative;
    margin-top: 32px;
    width: 100%;
    flex: 1;

    .layout__view {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
}

@mixin trViewActive {
  &-enter-active, &-leave-active {
    transform-style: preserve-3d;
    transition: transform 300ms;
    transition-timing-function: ease-in-out;
  }
}

.tr-view_left-right {
  @include trViewActive;
  &-enter-from { transform: translateX(100vw); }
  &-leave-to { transform: translateX(-100vw); }
}

.tr-view_right-left {
  @include trViewActive;
  &-enter-from { transform: translateX(-100vw); }
  &-leave-to { transform: translateX(100vw); }
}

</style>
