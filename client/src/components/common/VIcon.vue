<template>
  <svg :width="width" :height="height">
    <use :href="href" width="100%" height="100%"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'VIcon',

  props: {
    path: { type: String, default: 'empty' },

    withFill: { type: Boolean, default: false },
    withStroke: { type: Boolean, default: false },

    width: { type: [Number, String], default: 80 },
    height: { type: [Number, String], default: 80 },
  },

  setup(props) {
    const postfix = `.icon${props.withFill ? '' : '-nf'}${props.withStroke ? '' : '-ns'}`;

    const href = computed(() => `/icons/${props.path}${postfix}.svg#${props.path}${postfix}`);

    return { href };
  },
});
</script>
