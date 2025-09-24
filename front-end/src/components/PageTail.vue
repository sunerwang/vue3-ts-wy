<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="nav-buttons">
        <el-button
          v-for="route in routes"
          :key="route.path"
          :type="currentRoute === route.path ? 'primary' : ''"
          @click="navigateTo(route.path)"
          round
        >
          {{ route.name }}
        </el-button>
      </div>
      <div class="copyright">&copy; 2023 企业管理系统 - 版权所有</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 路由配置
const routes = ref([
  { path: '/', name: '首页' },
  { path: '/users', name: '用户管理' },
  { path: '/stats', name: '数据统计' },
  { path: '/settings', name: '系统设置' },
  { path: '/PageTest07', name: 'PageTest07' }
])

// 当前路由
const currentRoute = ref('/')

// 导航到指定路由
const navigateTo = (path: string) => {
  router.push(path)
  currentRoute.value = path
}

// 监听路由变化
onMounted(() => {
  currentRoute.value = route.path
})
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px 30px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.copyright {
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .nav-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
