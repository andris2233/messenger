<template>
  <div class="profile-info">
    <img
      :width="profileIconWidth"
      src="@/assets/icons/default-profile-icon.jpg"
      alt="Profile icon"
      class="profile-info__icon"
    >
    <div class="profile-info__username">{{ user.username }}</div>
    <div class="profile-info__email">{{ user.email }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileInfo',
  props: {
    profileIconWidth: {
      type: String,
      default: '240',
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss">
.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &__icon {
    border: 1px solid var(--color-primary);
    border-radius: 100%;
    user-select: none;
  }

  &__username {
    font-size: var(--font-size-h1);
  }

  &__email {
    font-size: var(--font-size-h2);
    font-weight: 300;
  }
}
</style>
