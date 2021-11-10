<template>
  <ViewAuthBackground />

  <div class="centralize">
    <RouterView />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ViewAuthBackground from '@/components/views/auth/ViewAuthBackground.vue';

export default defineComponent({
  name: 'LayoutAuth',

  components: { ViewAuthBackground },
});
</script>

<style lang="scss" scoped>
.centralize {
  margin: 0 auto;
  width: 460px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
