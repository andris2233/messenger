<template>
  <div class="friends">
    <VInput
      placeholder="Search friends"
      class="input_large"
      @keydown="onInputKeyDown"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VInput from '@/components/common/VInput.vue';
import VIcon from '@/components/common/VIcon.vue';

export default defineComponent({
  name: 'ViewFriends',

  components: { VIcon, VInput },

  setup() {
    const onSearch = () => {
      console.log('onSearch');
    };
    const onInputKeyDown = (ev) => {
      if (ev.key === 'Enter') onSearch();
    };

    return {
      onSearch,
      onInputKeyDown,
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
