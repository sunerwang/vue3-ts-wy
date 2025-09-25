import { io, Socket } from 'socket.io-client'

interface WebSocketMessage {
  type: string
  data?: any
  channel?: string
}

class WebSocketService {
  private socket: Socket | null = null
  private messageHandlers: Map<string, Array<(data: any) => void>> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectInterval = 3000
  private isConnected = false

  constructor(private url: string) {
    console.log('🔄 WebSocketService 初始化，连接地址:', this.url)
  }

  // 连接Socket.IO
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log(`🔄 尝试连接到 Socket.IO: ${this.url}`)

        this.socket = io(this.url, {
          transports: ['websocket', 'polling'], // 多种传输方式
          timeout: 10000,
          reconnection: false // 我们手动控制重连
        })

        this.socket.on('connect', () => {
          console.log('✅ Socket.IO 连接成功')
          this.isConnected = true
          this.reconnectAttempts = 0
          resolve()
        })

        this.socket.on('message', (data: any) => {
          console.log('📨 收到 Socket.IO 消息:', data)
          this.handleMessage(data)
        })

        // 监听Redis消息
        this.socket.on('redis:message', (data: any) => {
          console.log('📨 收到 Redis 消息:', data)
          this.handleMessage({
            type: 'redis:message',
            data: data
          })
        })

        this.socket.on('disconnect', (reason) => {
          console.log('❌ Socket.IO 连接关闭:', reason)
          this.isConnected = false
          this.handleReconnection()
        })

        this.socket.on('connect_error', (error) => {
          console.error('💥 Socket.IO 连接错误:', error)
          reject(new Error(`Socket.IO连接失败: ${error.message}`))
        })

        // 设置连接超时
        setTimeout(() => {
          if (!this.isConnected) {
            reject(new Error('连接超时'))
          }
        }, 10000)
      } catch (error) {
        console.error('💥 创建 Socket.IO 连接异常:', error)
        reject(error)
      }
    })
  }

  // 处理重连
  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(
        `🔄 尝试重新连接... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      )

      setTimeout(() => {
        this.connect().catch(console.error)
      }, this.reconnectInterval)
    } else {
      console.error('❌ 达到最大重连次数，停止重连')
    }
  }

  // 发送消息
  send(message: WebSocketMessage) {
    if (this.socket && this.isConnected) {
      console.log('📤 发送消息:', message)
      this.socket.emit(message.type, message.data || message.channel)
    } else {
      console.warn('⚠️ Socket.IO 未连接，无法发送消息')
    }
  }

  // 订阅Redis频道
  subscribe(channel: string) {
    console.log(`📡 订阅频道: ${channel}`)
    this.send({
      type: 'redis:subscribe',
      channel
    })
  }

  // 取消订阅
  unsubscribe(channel: string) {
    console.log(`📡 取消订阅频道: ${channel}`)
    this.send({
      type: 'redis:unsubscribe',
      channel
    })
  }

  // 发布消息
  publish(channel: string, message: any) {
    console.log(`📤 发布消息到频道 ${channel}:`, message)
    this.send({
      type: 'redis:publish',
      data: { channel, message }
    })
  }

  // 处理接收到的消息
  private handleMessage(message: any) {
    console.log('🔍 处理消息:', message)
    const handlers = this.messageHandlers.get(message.type) || []
    handlers.forEach((handler) => handler(message.data))
  }

  // 注册消息处理器
  on(messageType: string, handler: (data: any) => void) {
    console.log(`👂 注册消息处理器: ${messageType}`)
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, [])
    }
    this.messageHandlers.get(messageType)!.push(handler)
  }

  off(messageType: string, handler: (data: any) => void) {
    const handlers = this.messageHandlers.get(messageType)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  // 断开连接
  disconnect() {
    console.log('🔌 断开 Socket.IO 连接')
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    this.isConnected = false
  }

  // 获取连接状态
  getConnectionStatus() {
    return this.isConnected
  }
}

// 注意：这里使用 http 而不是 ws，因为 Socket.IO 基于 HTTP
export const webSocketService = new WebSocketService('http://localhost:3001')
