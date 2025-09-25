// 前端 useRedisSubscription.ts - 添加更多日志
import { ref, onUnmounted } from 'vue'
import { webSocketService } from '@/services/websocketService'

export function useRedisSubscription() {
  const isConnected = ref(false)
  const lastMessage = ref<any>(null)
  const error = ref<string | null>(null)

  console.log('🔄 useRedisSubscription 初始化')

  // 连接WebSocket
  const connect = async () => {
    console.log('🔄 开始连接 WebSocket...')
    try {
      await webSocketService.connect()
      isConnected.value = true
      error.value = null
      console.log('✅ useRedisSubscription 连接成功')

      // 监听Redis消息
      webSocketService.on('redis:message', handleRedisMessage)
      console.log('👂 已注册 redis:message 处理器')
    } catch (err) {
      error.value = `连接失败: ${err}`
      console.error('❌ useRedisSubscription 连接失败:', err)
    }
  }

  // 处理Redis消息
  const handleRedisMessage = (data: any) => {
    console.log('📨 useRedisSubscription 收到 Redis 消息:', data)
    lastMessage.value = data
  }

  // 订阅频道
  const subscribe = (channel: string) => {
    console.log(`📡 useRedisSubscription 订阅频道: ${channel}`)
    if (isConnected.value) {
      webSocketService.subscribe(channel)
    } else {
      console.warn('⚠️ 未连接，无法订阅频道')
    }
  }

  // 取消订阅
  const unsubscribe = (channel: string) => {
    console.log(`📡 useRedisSubscription 取消订阅频道: ${channel}`)
    if (isConnected.value) {
      webSocketService.unsubscribe(channel)
    }
  }

  // 发布消息
  const publish = (channel: string, message: any) => {
    console.log(`📤 useRedisSubscription 发布消息到频道 ${channel}:`, message)
    if (isConnected.value) {
      webSocketService.publish(channel, message)
    } else {
      console.warn('⚠️ 未连接，无法发布消息')
    }
  }

  // 清理
  onUnmounted(() => {
    console.log('🧹 useRedisSubscription 清理')
    webSocketService.off('redis:message', handleRedisMessage)
  })

  return {
    isConnected,
    lastMessage,
    error,
    connect,
    subscribe,
    unsubscribe,
    publish
  }
}
