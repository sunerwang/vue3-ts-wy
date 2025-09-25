const Redis = require('ioredis')
const redis = new Redis({ host: 'localhost', port: 6379 })

redis.ping().then(console.log).catch(console.error)
