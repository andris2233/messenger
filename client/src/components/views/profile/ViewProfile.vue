<template>
  <div class="profile">
    <ProfileInfo :user="userData" profile-icon-width="150" />

    <ProfileSettings
      v-model:user="userData"
      class="mt-32"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { userService } from '@/api/user.service';
import ProfileInfo from '@/components/views/profile/ProfileInfo.vue';
import ProfileSettings from '@/components/views/profile/ProfileSettings.vue';

export default defineComponent({
  name: 'ViewProfile',

  components: { ProfileSettings, ProfileInfo },

  setup() {
    const userData = ref({});

    userService
      .getProfileData()
      .then((v) => { userData.value = v; });

    const isUser = computed(() => Object.keys(userData.value).length);

    return {
      userData,
      isUser,
    };
  },
});
</script>

<style scoped lang="scss">
.profile {
  width: 362px;
  margin: 0 auto;
}
</style>
