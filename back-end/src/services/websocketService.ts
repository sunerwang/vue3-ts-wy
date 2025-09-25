import { Server } from 'socket.io'
import { Redis } from 'ioredis'
import { redisConfig } from './../config/redis' // 导入统一配置

class WebSocketService {
  private io: Server
  private redisSub: Redis
  private redisPub: Redis
  private channelSubscriptions: Map<string, Set<string>> = new Map()

  constructor(io: Server) {
    this.io = io

    // 创建Redis客户端（一个用于订阅，一个用于发布）
    // 使用统一的Redis配置
    this.redisSub = new Redis(redisConfig)
    this.redisPub = new Redis(redisConfig)

    // 添加错误处理
    this.setupRedisErrorHandling()
    this.setupRedisSubscription()
    this.setupSocketHandlers()
  }

  // 添加Redis错误处理
  private setupRedisErrorHandling() {
    const handleRedisError = (error: Error) => {
      console.error('Redis连接错误:', error)
    }

    this.redisSub.on('error', handleRedisError)
    this.redisPub.on('error', handleRedisError)

    // 添加连接成功监听
    this.redisSub.on('connect', () => {
      console.log('✅ Redis订阅客户端连接成功')
    })

    this.redisPub.on('connect', () => {
      console.log('✅ Redis发布客户端连接成功')
    })
  }

  // 设置Redis订阅
  private setupRedisSubscription() {
    this.redisSub.on('message', (channel: string, message: string) => {
      console.log(`Received message from Redis channel ${channel}:`, message)

      try {
        const parsedMessage = JSON.parse(message)
        const socketIds = this.channelSubscriptions.get(channel)

        if (socketIds && socketIds.size > 0) {
          socketIds.forEach((socketId) => {
            this.io.to(socketId).emit('redis:message', {
              channel,
              message: parsedMessage
            })
          })
        }
      } catch (error) {
        console.error('解析Redis消息失败:', error)
      }
    })
  }

  // 设置Socket事件处理
  private setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // 订阅Redis频道
      socket.on('redis:subscribe', (channel: string) => {
        this.subscribeToChannel(socket.id, channel)
        socket.emit('redis:subscribed', { channel, success: true })
      })

      // 取消订阅Redis频道
      socket.on('redis:unsubscribe', (channel: string) => {
        this.unsubscribeFromChannel(socket.id, channel)
        socket.emit('redis:unsubscribed', { channel, success: true })
      })

      // 发布消息到Redis频道
      socket.on('redis:publish', (data: { channel: string; message: any }) => {
        this.publishToChannel(data.channel, data.message)
      })

      // 断开连接清理
      socket.on('disconnect', () => {
        this.cleanupSocketSubscriptions(socket.id)
        console.log('Client disconnected:', socket.id)
      })
    })
  }

  // 订阅频道
  private subscribeToChannel(socketId: string, channel: string) {
    if (!this.channelSubscriptions.has(channel)) {
      this.channelSubscriptions.set(channel, new Set())
      // 第一次订阅该频道时，向Redis订阅
      this.redisSub.subscribe(channel)
    }

    this.channelSubscriptions.get(channel)!.add(socketId)
    console.log(`Socket ${socketId} subscribed to channel ${channel}`)
  }

  // 取消订阅
  private unsubscribeFromChannel(socketId: string, channel: string) {
    const subscribers = this.channelSubscriptions.get(channel)
    if (subscribers) {
      subscribers.delete(socketId)

      if (subscribers.size === 0) {
        this.channelSubscriptions.delete(channel)
        this.redisSub.unsubscribe(channel)
      }
    }
  }

  // 发布消息
  public publishToChannel(channel: string, message: any) {
    this.redisPub.publish(channel, JSON.stringify(message))
  }

  // 清理Socket订阅
  private cleanupSocketSubscriptions(socketId: string) {
    for (const [channel, subscribers] of this.channelSubscriptions.entries()) {
      if (subscribers.has(socketId)) {
        subscribers.delete(socketId)

        if (subscribers.size === 0) {
          this.channelSubscriptions.delete(channel)
          this.redisSub.unsubscribe(channel)
        }
      }
    }
  }
}

export default WebSocketService
