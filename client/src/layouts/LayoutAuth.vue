<template>
  <ViewAuthBackground />

  <div class="centralize">
    <div class="w-100 d-flex justify-items-center">
      <div class="beta-logo"></div>
    </div>

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
  width: 440px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  transition: width 300ms;

  .beta-logo {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: var(--color-white);
    box-shadow: var(--shadow-1);

    transition: opacity 200ms;
    pointer-events: none;
  }
}

@media (max-width: 1440px) {
  .centralize { width: 440px; }
}

@media (max-width: 440px) {
  .centralize {
    padding: 10px;
    width: 100%;
  }
}
</style>
