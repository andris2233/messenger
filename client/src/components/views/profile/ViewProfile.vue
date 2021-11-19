<template>
  <div class="profile">
    <ProfileInfo :user="userData" profile-icon-width="150" />

    <ProfileSettings
      v-model:value="userData"
      class="mt-32"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { userService } from '@/api/user.service';
import ProfileInfo from '@/components/views/profile/ProfileInfo.vue';
import ProfileSettings from '@/components/views/profile/ProfileSettings.vue';

export default defineComponent({
  name: 'ViewProfile',

  components: { ProfileSettings, ProfileInfo },

  setup() {
    const userData = ref({});

    onMounted(async () => {
      userData.value = await userService.getProfileData();
    });

    return {
      userData,
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
