<template>
  <header class="header">
    <div class="header-content">
      <!-- 左侧系统信息 -->
      <div class="system-info">
        <h1>{{ systemName }}</h1>
        <p>{{ systemDescription }}</p>
      </div>

      <!-- 中间日期时间显示 -->
      <div class="datetime-info">
        <div class="current-date">{{ currentDate }}</div>
        <div class="current-time">{{ currentTime }}</div>
      </div>

      <!-- 右侧用户操作区 -->
      <div class="user-actions">
        <!-- 全屏/退出全屏按钮 -->
        <el-tooltip
          :content="isFullscreen ? '退出全屏' : '全屏显示'"
          placement="bottom"
        >
          <el-button
            :icon="isFullscreen ? 'FullScreen' : 'Aim'"
            circle
            @click="toggleFullscreen"
            class="fullscreen-btn"
          />
        </el-tooltip>

        <!-- 用户信息 -->
        <div class="user-info">
          <el-avatar :size="40" :src="user.avatar"></el-avatar>
          <div class="user-details">
            <p class="welcome-text">欢迎，{{ user.name }}</p>
            <p class="login-time">上次登录: {{ user.lastLogin }}</p>
          </div>
          <el-button type="primary" plain @click="handleLogout"
            >退出登录</el-button
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

// 系统信息
const systemName = ref('企业管理系统')
const systemDescription = ref('基于Vue3 + TypeScript + Element Plus构建')

// 用户信息
const user = ref({
  name: '管理员',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  lastLogin: '2023-10-15'
})

// 全屏状态
const isFullscreen = ref(false)

// 日期时间相关
const currentDate = ref('')
const currentTime = ref('')
let timeInterval: number | null = null

// 更新日期时间
const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    // 进入全屏
    document.documentElement
      .requestFullscreen()
      .then(() => {
        isFullscreen.value = true
      })
      .catch((err) => {
        console.error('全屏请求失败:', err)
        ElMessage.warning('您的浏览器不支持全屏功能')
      })
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        isFullscreen.value = false
      })
    }
  }
}

// 处理全屏变化事件
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// 退出登录处理
const handleLogout = () => {
  ElMessage.success('退出登录成功')
}

// 生命周期
onMounted(() => {
  // 初始化日期时间
  updateDateTime()
  timeInterval = window.setInterval(updateDateTime, 1000)

  // 监听全屏变化
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  // 清除定时器
  if (timeInterval) {
    clearInterval(timeInterval)
  }

  // 移除事件监听
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.system-info h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.system-info p {
  margin: 4px 0 0 0;
  font-size: 14px;
  opacity: 0.8;
}

.datetime-info {
  text-align: center;
  flex: 1;
  max-width: 300px;
}

.current-date {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.current-time {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.fullscreen-btn {
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.fullscreen-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-details {
  text-align: right;
}

.welcome-text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.login-time {
  margin: 2px 0 0 0;
  font-size: 12px;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    height: auto;
    padding: 15px;
  }

  .header-content {
    flex-direction: column;
    gap: 15px;
  }

  .datetime-info {
    order: 3;
    width: 100%;
    max-width: 100%;
  }

  .user-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
