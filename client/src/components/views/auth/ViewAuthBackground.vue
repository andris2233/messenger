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

<script>
import { defineComponent, defineExpose, onMounted, ref, reactive } from 'vue';

const setupResizeObserver = () => {
  const r = {
    wrapper: ref(null),
    width: ref(1440),
    height: ref(1024),

    circles: reactive([
      {
        positionOffsetByCenter: {
          x: -352.204 - 1440 / 2,
          y: 881.714 - 1024 / 2,
        },
        attrs: {
          cx: null,
          cy: null,
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
          cx: null,
          cy: null,
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
          cx: null,
          cy: null,
          r: 1763.12,
          fill: 'var(--color-secondary)',
        },
      },
    ]),
  };
  defineExpose({ wrapper: r.wrapper });

  onMounted(() => {
    r.resizeObserver = new ResizeObserver((ev) => {
      const { width, height } = ev[0].contentRect;

      r.width.value = width;
      r.height.value = height;

      r.circles.forEach((circle) => {
        circle.attrs.cx = circle.positionOffsetByCenter.x + width / 2;
        circle.attrs.cy = circle.positionOffsetByCenter.y + height / 2;
      });
    });
    r.resizeObserver.observe(r.wrapper.value);
  });

  return r;
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
