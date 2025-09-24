<template>
  <main class="main-content">
    <div class="page-container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
// 这个组件主要作为路由视图容器
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 30px;
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
}

.page-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  min-height: 500px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }
}
</style>
