<template>
  <div id="app">
    <PageHead />
    <PageBody />
    <PageTail />
  </div>
</template>

<script setup lang="ts">
import PageHead from './components/PageHead.vue'
import PageBody from './components/PageBody.vue'
import PageTail from './components/PageTail.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
