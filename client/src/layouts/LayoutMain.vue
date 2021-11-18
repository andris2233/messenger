<template>
  <TheHeader class="mb-32" />
  <RouterView />
</template>

<script>
import { defineComponent } from 'vue';
import TheHeader from '@/components/single/TheHeader.vue';

export default defineComponent({
  name: 'LayoutMain',

  components: { TheHeader },
});
</script>

<style scoped>
</style>
