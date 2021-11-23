<template>
  <div class="flex-1 d-flex flex-col">
    <VInput
      v-model:value="value"
      placeholder="Search friends"
      class="input_large"
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

    <VList
      ref="list"
      :groups="groups"
      class="mt-10 flex-1"
    >
      <template #item="{ item }">
        <VIcon path="empty" width="30" height="30" with-fill class="mr-10" />
        <span>{{ item.username }}</span>
      </template>
    </VList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import debounce from 'lodash/debounce';
import { IListGroup } from '@/components/common/VList/types';
import { friendService } from '@/api/friend.service';
import { userService } from '@/api/user.service';

import VList from '@/components/common/VList/VList.vue';
import VIcon from '@/components/common/VIcon.vue';
import VInput from '@/components/common/VInput.vue';

export default defineComponent({
  name: 'ViewFriendsMain',

  components: { VInput, VIcon, VList },

  setup() {
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
    onSearch().then(() => console.log(JSON.parse(JSON.stringify(groups))));

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
  },
});
</script>
