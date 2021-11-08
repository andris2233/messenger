<template>
  <div class="form-wrapper">
    <slot name="formHeader" />
    <form class="form" @submit.prevent>
      <div class="form__content">
        <slot name="formContent" />
      </div>
      <div class="form__footer">
        <slot name="formFooter" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLogin',
});
</script>

<style scoped lang="scss">
.form {
  margin-top: 100px;

  &__footer {
    margin-top: 65px;
  }
}
</style>
