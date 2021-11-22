<template>
  <div class="friends">
    <VInput
      v-model:value="search.value.value"
      placeholder="Search friends"
      class="input_large"
      @keydown.enter="search.onSearch"
      @right-icon-click="search.onSearch"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import debounce from 'lodash/debounce';
// import { userService } from '@/api/user.service';
import { friendService } from '@/api/friend.service';

import VInput from '@/components/common/VInput.vue';
import VIcon from '@/components/common/VIcon.vue';

/*#region Search*/
const setupSearch = () => {
  const value = ref('');

  const onSearch = async () => {
    console.log('Search');
    // console.log(await userService.get({ search: value.value, page: 0, size: 20 }));
    console.log(await friendService.getFriends({ search: value.value, page: 0, size: 20 }));
  };

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
    onSearch,
    onInput,
  };
};
/*#endregion Search*/

export default defineComponent({
  name: 'ViewFriends',

  components: { VIcon, VInput },

  setup() {
    return {
      search: setupSearch(),
    };
  },
});
</script>

<style lang="scss" scoped>
.friends {
  margin: 0 auto;
  width: 460px;
}
</style>
