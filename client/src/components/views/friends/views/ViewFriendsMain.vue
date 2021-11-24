<template>
  <div ref="main" class="relative flex-1">
    <VInput
      v-model:value="value"
      placeholder="Search friends"
      class="block-wrapper input_large"
      @keydown.enter="onSearch"
      @right-icon-click="onSearch"
    >
      <template #icon-right>
        <VIcon
          path="search/right"
          width="30"
          height="30"
          style="stroke: var(--color-primary); fill: none;"
        />
      </template>
    </VInput>

    <div ref="list" class="mt-10 pl-12 pb-32 overflow-y-scroll" :style="{ height: `${listHeight}px` }">
      <VList
        :groups="groups"
        class="block-wrapper"
      >
        <template #item="{ item, group }">
          <VIcon path="empty" width="30" height="30" with-fill class="mr-10" />
          <span class="flex-1">{{ item.username }}</span>
          <VButton v-if="group.key === 'users'" class="button_flat">Add</VButton>
        </template>
      </VList>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, onUnmounted, Ref } from 'vue';
import debounce from 'lodash/debounce';
import { IListGroup } from '@/components/common/VList/types';
import { friendService } from '@/api/friend.service';
import { userService } from '@/api/user.service';

import VList from '@/components/common/VList/VList.vue';
import VIcon from '@/components/common/VIcon.vue';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

/*#region Search*/
const setupSearch = () => {
  const value = ref('');

  const groups: Ref<IListGroup[]> = ref([]);

  const onSearch = async () => {
    groups.value = [];
    const trimmedValue = value.value.trim();

    if (trimmedValue.length) {
      const foundFriends = (await friendService
        .getFriends({ search: trimmedValue, page: 0, size: 20 })).rows;
      const foundUsers = (await userService
        .getUsers({ search: trimmedValue, page: 0, size: 20 })).rows;

      if (foundFriends.length) groups.value.push({ key: 'friends', title: 'Found in your friends', items: foundFriends });
      if (foundUsers.length) groups.value.push({ key: 'users', title: 'Found in global search', items: foundUsers });
    }
    else {
      const foundFriends = (await friendService
        .getFriends({ search: '', page: 0, size: 20 })).rows;
      groups.value.push({ key: 'friends', title: 'Friends', items: foundFriends });
    }
  };
  onSearch();

  const onInput = debounce(() => onSearch(), 300);

  const compValue = computed({
    get: () => value.value,
    set: (v) => {
      value.value = v;
      onInput();
    },
  });

  return {
    value: compValue,
    groups,
    onInput,
    onSearch,
  };
};
/*#endregion Search*/

/*#region Resize*/
const setupResize = () => {
  // Template refs
  const main: Ref<HTMLElement> = ref({} as HTMLElement);
  const list: Ref<HTMLElement> = ref({} as HTMLElement);

  const listHeight = ref(0);

  const resizeHandler = () => {
    listHeight.value = main.value.offsetHeight - list.value.offsetTop;
  };

  onMounted(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler);
  });

  return {
    main,
    list,
    listHeight,
  };
};
/*#endregion Resize*/

export default defineComponent({
  name: 'ViewFriendsMain',

  components: { VButton, VInput, VIcon, VList },

  setup() {
    return {
      ...setupSearch(),
      ...setupResize(),
    };
  },
});
</script>
