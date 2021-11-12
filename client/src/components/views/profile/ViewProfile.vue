<template>
  <div class="profile">
    <ProfileInfo :user="userData" />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import ProfileInfo from '@/components/views/profile/ProfileInfo.vue';
import { userService } from '@/services/user.service';

export default defineComponent({
  name: 'ViewProfile',
  components: { ProfileInfo },
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
