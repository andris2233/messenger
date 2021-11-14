<template>
  <ViewAuthBackground />

  <div class="centralize">
    <div class="w-100 d-flex justify-items-center">
      <VIcon
        path="logo/normal"
        with-fill
        width="160"
        height="160"
        class="logo"
      />
    </div>

    <RouterView />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import VIcon from '@/components/common/VIcon.vue';
import ViewAuthBackground from '@/components/views/auth/ViewAuthBackground.vue';

export default defineComponent({
  name: 'LayoutAuth',

  components: { VIcon, ViewAuthBackground },
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

  .logo {
    fill: var(--color-white);
    color: var(--color-primary);
    filter: drop-shadow(#{var(--shadow-1)});
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
