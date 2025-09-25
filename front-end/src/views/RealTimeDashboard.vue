<template>
  <div class="dashboard">
    <h2>实时数据看板</h2>

    <div v-if="!isConnected" class="connection-status">
      <button @click="connectWebSocket">连接实时数据</button>
      <span v-if="error" class="error">{{ error }}</span>
    </div>

    <div v-else class="dashboard-content">
      <div class="status">已连接 ✓</div>

      <div class="channels">
        <div class="channel-control">
          <input v-model="newChannel" placeholder="输入频道名称" />
          <button @click="subscribeToChannel">订阅频道</button>
        </div>

        <div class="subscribed-channels">
          <h3>已订阅频道:</h3>
          <div
            v-for="channel in subscribedChannels"
            :key="channel"
            class="channel"
          >
            <span>{{ channel }}</span>
            <button @click="unsubscribeFromChannel(channel)">取消订阅</button>
          </div>
        </div>
      </div>

      <div class="messages">
        <h3>实时消息:</h3>
        <div v-for="(msg, index) in messages" :key="index" class="message">
          <strong>[{{ msg.channel }}]</strong>:
          {{ JSON.stringify(msg.message) }}
          <small>{{ msg.timestamp }}</small>
        </div>
      </div>

      <div class="publish-section">
        <h3>发布消息:</h3>
        <select v-model="publishChannel">
          <option
            v-for="channel in subscribedChannels"
            :key="channel"
            :value="channel"
          >
            {{ channel }}
          </option>
        </select>
        <textarea
          v-model="publishMessage"
          placeholder="输入要发布的消息"
        ></textarea>
        <button @click="publishMessageToChannel">发布</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRedisSubscription } from '@/composables/useRedisSubscription'

const {
  isConnected,
  lastMessage,
  error,
  connect,
  subscribe,
  unsubscribe,
  publish
} = useRedisSubscription()

const subscribedChannels = ref<string[]>(['user-updates', 'system-alerts'])
const messages = ref<
  Array<{ channel: string; message: any; timestamp: string }>
>([])
const newChannel = ref('')
const publishChannel = ref('user-updates')
const publishMessage = ref('')

// 连接WebSocket
const connectWebSocket = async () => {
  await connect()

  // 自动订阅默认频道
  subscribedChannels.value.forEach((channel) => {
    subscribe(channel)
  })
}

// 订阅新频道
const subscribeToChannel = () => {
  if (
    newChannel.value &&
    !subscribedChannels.value.includes(newChannel.value)
  ) {
    subscribedChannels.value.push(newChannel.value)
    subscribe(newChannel.value)
    newChannel.value = ''
  }
}

// 取消订阅
const unsubscribeFromChannel = (channel: string) => {
  const index = subscribedChannels.value.indexOf(channel)
  if (index > -1) {
    subscribedChannels.value.splice(index, 1)
    unsubscribe(channel)
  }
}

// 发布消息
const publishMessageToChannel = () => {
  if (publishChannel.value && publishMessage.value) {
    try {
      const message = JSON.parse(publishMessage.value)
      publish(publishChannel.value, message)
      publishMessage.value = ''
    } catch {
      // 如果不是JSON，直接发送字符串
      publish(publishChannel.value, publishMessage.value)
      publishMessage.value = ''
    }
  }
}

// 监听新消息
const handleNewMessage = () => {
  if (lastMessage.value) {
    messages.value.unshift({
      channel: lastMessage.value.channel,
      message: lastMessage.value.message,
      timestamp: new Date().toLocaleTimeString()
    })

    // 只保留最近50条消息
    if (messages.value.length > 50) {
      messages.value = messages.value.slice(0, 50)
    }
  }
}

// 监听lastMessage变化
import { watch } from 'vue'
watch(lastMessage, handleNewMessage)

onMounted(() => {
  // 组件挂载时自动连接
  connectWebSocket()
})

onUnmounted(() => {
  // 清理订阅
  subscribedChannels.value.forEach((channel) => {
    unsubscribe(channel)
  })
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.connection-status {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
  margin-left: 10px;
}

.status {
  color: green;
  font-weight: bold;
}

.channels,
.messages,
.publish-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.channel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
}

.message {
  padding: 5px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
}

.message small {
  color: #666;
  margin-left: 10px;
}

.publish-section textarea {
  width: 100%;
  height: 80px;
  margin: 10px 0;
}
</style>
