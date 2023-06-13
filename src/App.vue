<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import loading from './components/loading.vue'
</script>

<style lang="less" scoped>
.app {
  height: 100vh;
}
</style>
