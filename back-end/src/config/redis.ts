import Redis from 'ioredis'

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  // 添加连接超时和重试配置
  connectTimeout: 10000,
  lazyConnect: true // 延迟连接以便更好的错误处理
}

// 添加连接测试函数
export async function testRedisConnection() {
  const redis = new Redis(redisConfig)
  try {
    await redis.ping()
    console.log('✅ Redis连接成功')
    return true
  } catch (error) {
    console.error('❌ Redis连接失败:', error)
    return false
  } finally {
    await redis.quit()
  }
}
