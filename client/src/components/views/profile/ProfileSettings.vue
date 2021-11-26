<template>
  <form class="form-profile-settings" @submit.prevent>
    <VInput
      v-model:value="userData.email"
      label="Email"
    />

    <VInput
      v-model:value="userData.username"
      label="Username"
    />

    <VInput
      v-model:value="userData.firstName"
      label="Name"
    />

    <VInput
      v-model:value="userData.lastName"
      label="Surname"
    />

    <VCheckbox v-model:checked="userData.isPrivate">Private profile</VCheckbox>

    <VCheckbox v-model:checked="showPassword">Change password</VCheckbox>

    <VInput
      v-if="showPassword"
      v-model:value="userPasswords.oldPassword"
      label="Old password"
      type="password"
    />

    <VInput
      v-if="showPassword"
      v-model:value="userPasswords.newPassword"
      label="New password"
      type="password"
    />

    <VButton
      type="submit"
      :disabled="!hasChanges"
      @click="updateProfile"
    >
      Save changes
    </VButton>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, Ref, PropType, toRef, reactive } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import VInput from '@/components/common/VInput.vue';
import VCheckbox from '@/components/common/VCheckbox.vue';
import VButton from '@/components/common/VButton.vue';
import { IUserProfile } from '@/models/user';
import { userService } from '@/api/user.service';

export default defineComponent({
  name: 'ProfileSettings',

  components: {
    VButton,
    VCheckbox,
    VInput,
  },

  props: {
    user: { type: Object as PropType<IUserProfile>, default: () => ({}) },
  },

  emits: ['update:user'],

  setup(props, { emit }) {
    const user = toRef(props, 'user');
    const userData: Ref<IUserProfile> = ref({} as IUserProfile);
    const showPassword = ref(false);
    const userPasswords = reactive({
      oldPassword: '',
      newPassword: '',
    });

    watch(user, (nv: IUserProfile) => {
      userData.value = cloneDeep(nv);
    }, { deep: true });

    const isPasswordUpdated = computed(() => !!userPasswords.oldPassword && !!userPasswords.newPassword);
    const isProfileUpdated = computed(() => !isEqual(userData.value, cloneDeep(props.user)));
    const hasChanges = computed(() => isProfileUpdated.value || isPasswordUpdated.value);

    const updateProfile = async () => {
      try {
        if (isProfileUpdated.value) {
          const changedUserData = Object.keys(userData.value).filter((key) => (
            userData.value[key as keyof IUserProfile] !== props.user[key as keyof IUserProfile]))
            .reduce((keys, key) => ({
              ...keys,
              [key]: userData.value[key as keyof IUserProfile],
            }), {});

          await userService.updateUser(changedUserData);

          emit('update:user', userData.value);

          userData.value = cloneDeep(userData.value);
        }

        if (isPasswordUpdated.value) {
          await userService.updatePassword(userPasswords);

          userPasswords.oldPassword = '';
          userPasswords.newPassword = '';
        }
      }
      catch (e) {
        console.log(e);
      }
    };

    return { userData, updateProfile, hasChanges, userPasswords, showPassword };
  },
});
</script>

<style lang="scss" scoped>
.form-profile-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
