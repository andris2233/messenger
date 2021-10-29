<template>
  <div class="messenger">
    <div class="messenger__sidebar sidebar">
      <div class="sidebar__profile-info">Профиль</div>
      <div class="sidebar__search"></div>
      <div class="sidebar__chats-list">
        <div class="sidebar__chats-item"></div>
        <div class="sidebar__chats-item"></div>
        <div class="sidebar__chats-item"></div>
      </div>
    </div>
    <div class="messenger__chat-screen chat-screen">
      <div class="chat-screen__info"></div>
      <div class="chat-screen__messages"></div>
      <div class="chat-screen__input"></div>
    </div>
  </div>
</template>

<script>

import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'PageMessenger',
})

export default class PageMessenger extends Vue {}

</script>

<style scoped lang="scss">
.messenger {
  display: flex;
  width: 60vw;
  height: 80vh;
  background-color: $color-messenger-bg;
  box-shadow: 0 0 7px $color-box-shadow;
  border-radius: 6px;

  &__sidebar {
    width: 35%;
    border-right: 1px solid $color-background;
  }

  &__chat-screen {
    width: 70%;
  }
}

.sidebar {
  &__profile-info {
    padding: 20px 10px;
    border-bottom: 1px solid $color-background;
    font-size: 24px;
  }
}
</style>
