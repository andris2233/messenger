<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'App',
})

export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
}
</style>
