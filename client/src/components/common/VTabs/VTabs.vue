<template>
  <div class="tabs">
    <ul class="tabs-list">
      <li
        v-for="(item, itemI) in items"
        :key="itemI"
        :class="[
          'tabs-list__item',
          { 'tabs-list__item_current': matchingFunction(current, item) },
        ]"
      >
        <button
          :ref="(el) => { elems[itemI] = el; }"
          @click="onElemClick(item)"
        >
          <slot name="item" v-bind="{ item, itemI }">{{ item }}</slot>
        </button>
      </li>
    </ul>

    <div
      v-if="underline.show"
      class="tabs__underline"
      :style="{
        left: `${underline.left}px`,
        width: `${underline.width}px`,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType, SetupContext } from 'vue';
import { TabsItem, TabsProps } from '@/components/common/VTabs/types';

const isMounted = ref(false);

const setupTabs = (props: TabsProps, context: SetupContext) => {
  const elems = ref([]);

  const underline = computed(() => {
    const emptyResult = { show: false, left: 0, width: 0 };

    if (!isMounted.value) return emptyResult;
    const { current, items } = props;

    const currentI = items.findIndex((item: any) => props.matchingFunction(current, item));

    if (currentI === -1) return emptyResult;
    const el: HTMLElement = elems.value[currentI];

    return {
      show: true,
      left: el.offsetLeft ? el.offsetLeft : 0,
      width: el.clientWidth ? el.clientWidth : 0,
    };
  });

  const onElemClick = (item: any) => context.emit('update:current', item);

  return {
    elems,
    underline,
    onElemClick,
  };
};

export default defineComponent({
  name: 'VTabs',

  props: {
    current: { type: Object as PropType<TabsItem>, default: null },
    items: { type: Array as PropType<TabsItem[]>, default: () => ([]) },

    matchingFunction: {
      type: Function as PropType<(current: TabsItem, item: TabsItem) => boolean>,
      default: (current: TabsItem, item: TabsItem) => current === item,
    },
  },

  setup(props: TabsProps, context: SetupContext) {
    onMounted(() => { isMounted.value = true; });

    return {
      isMounted,
      ...setupTabs(props, context),
    };
  },

  emits: ['update:current'],
});
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;

  ul.tabs-list {
    display: flex;
    margin: 0;
    padding: 0;
    height: 100%;
    list-style-type: none;

    li.tabs-list__item {
      padding: 0;

      & > button {
        padding: 0 20px;
        height: 100%;
        color: var(--color-black);
        background: none;
        border: none;
        outline: none;
        user-select: none;
      }
    }

    li.tabs-list__item_current > button {
      color: var(--color-primary);
      text-shadow: var(--shadow-focused);
    }
  }

  .tabs__underline {
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: var(--color-primary);
    box-shadow: var(--shadow-focused);
    transition: left 300ms, width 300ms;
    pointer-events: none;
  }
}
</style>
