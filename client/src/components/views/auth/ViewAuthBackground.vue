<template>
  <div ref="wrapper" class="wrapper">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <component
        :is="'circle'"
        v-for="(circle, circleI) in circles"
        :key="circleI"
        v-bind="circle.attrs"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, onUnmounted, Ref } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';

const setupResizeObserver = () => {
  const circles = reactive([
    {
      positionOffsetByCenter: {
        x: -352.204 - 1440 / 2,
        y: 881.714 - 1024 / 2,
      },
      attrs: {
        cx: 0,
        cy: 0,
        r: 1160.18,
        fill: 'var(--color-white)',
      },
    },
    {
      positionOffsetByCenter: {
        x: -147.675 - 1440 / 2,
        y: -1359.62 - 1024 / 2,
      },
      attrs: {
        cx: 0,
        cy: 0,
        r: 1763.12,
        fill: 'var(--color-white)',
        'fill-opacity': '0.42',
      },
    },
    {
      positionOffsetByCenter: {
        x: 2317.07 - 1440 / 2,
        y: 1581.15 - 1024 / 2,
      },
      attrs: {
        cx: 0,
        cy: 0,
        r: 1763.12,
        fill: 'var(--color-secondary)',
      },
    },
  ]);

  const wrapper: Ref<HTMLElement> = ref(document.body);

  const width = ref(1440);
  const height = ref(1024);

  const resizeObserver = new ResizeObserver((ev) => {
    const { width: w, height: h } = ev[0].contentRect;

    width.value = w;
    height.value = h;

    for (let i = 0; i < circles.length; i++) {
      circles[i].attrs.cx = circles[i].positionOffsetByCenter.x + w / 2;
      circles[i].attrs.cy = circles[i].positionOffsetByCenter.y + h / 2;
    }
  });

  onMounted(() => resizeObserver.observe(wrapper.value));
  onUnmounted(() => resizeObserver.disconnect());

  return {
    circles,
    width,
    height,
  };
};

export default defineComponent({
  name: 'ViewAuthBackground',

  setup() {
    return {
      ...setupResizeObserver(),
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;

  svg {
    background: var(--color-accent);
  }
}
</style>
