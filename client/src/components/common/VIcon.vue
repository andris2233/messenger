<template>
  <svg :width="width" :height="height">
    <use :href="href"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'VIcon',

  props: {
    path: { type: String, default: 'empty' },

    width: { type: Number, default: 80 },
    height: { type: Number, default: 80 },
  },

  setup(props) {
    const href = computed(() => `${props.path}#${props.path}`);

    return { href };
  },
});
</script>
