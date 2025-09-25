<template>
  <div class="user-status">
    <h3>用户状态监控</h3>
    <div v-if="!isConnected" class="connecting">连接中...</div>
    <div v-else>
      <div v-for="user in onlineUsers" :key="user.id" class="user">
        <span :class="['status-dot', user.status]"></span>
        {{ user.name }} - {{ user.status }}
        <small>最后活动: {{ formatTime(user.lastActivity) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRedisSubscription } from '@/composables/useRedisSubscription'

interface User {
  id: string
  name: string
  status: 'online' | 'offline' | 'away'
  lastActivity: Date
}

const onlineUsers = ref<User[]>([])
const { isConnected, connect, subscribe } = useRedisSubscription()

onMounted(async () => {
  await connect()
  subscribe('user-status')

  // 正确获取 webSocketService 实例
  const { webSocketService } = await import('@/services/websocketService')
  webSocketService.on('redis:message', (data: any) => {
    if (data.channel === 'user-status') {
      updateUserStatus(data.message)
    }
  })
})

const updateUserStatus = (userData: User) => {
  const index = onlineUsers.value.findIndex((u) => u.id === userData.id)
  if (index >= 0) {
    onlineUsers.value[index] = userData
  } else {
    onlineUsers.value.push(userData)
  }
}

const formatTime = (time: Date) => {
  return new Date(time).toLocaleTimeString()
}
</script>

<style scoped>
.user-status {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
}

.user {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 5px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.status-dot.online {
  background-color: green;
}

.status-dot.offline {
  background-color: red;
}

.status-dot.away {
  background-color: orange;
}
</style>
