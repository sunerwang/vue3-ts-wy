// testRedisConnection.ts
import { Redis } from 'ioredis'
import { redisConfig } from './../config/redis'

async function testConnection() {
  console.log('测试Redis连接...')
  console.log('配置:', redisConfig)

  const redis = new Redis(redisConfig)

  try {
    // 测试连接
    const pingResult = await redis.ping()
    console.log('✅ Ping结果:', pingResult)

    // 测试发布订阅
    await new Promise<void>((resolve, reject) => {
      const sub = new Redis(redisConfig)

      sub.subscribe('test-channel', (err) => {
        if (err) reject(err)

        sub.on('message', (channel, message) => {
          console.log('✅ 收到订阅消息:', { channel, message })
          sub.unsubscribe()
          sub.quit()
          resolve()
        })

        // 发布测试消息
        redis.publish('test-channel', JSON.stringify({ test: 'message' }))
      })
    })

    console.log('✅ 所有测试通过')
  } catch (error) {
    console.error('❌ 连接测试失败:', error)
  } finally {
    await redis.quit()
  }
}

testConnection()
