<template>
  <div class="login">
    <div class="login__header">Добро пожаловать в мессенджер!</div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'PageAuth',
})

export default class PageAuth extends Vue {}
</script>

<style scoped lang="scss">
.login {
  width: 30%;
  height: 40%;
  padding: 20px;
  background-color: $color-messenger-bg;
  border-radius: 6px;
  box-shadow: 0 0 5px $color-box-shadow;

  &__header {
    padding: 10px 0;
    text-align: center;
    font-weight: 700;
    font-size: 30px;
  }
}
</style>
