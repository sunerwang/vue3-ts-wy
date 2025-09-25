import express, { Express, Request, Response, NextFunction } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import rollingPerformanceRoutes from './routes/rollingPerformance'
import WebSocketService from './services/websocketService'

// 加载环境变量
dotenv.config()

class App {
  public app: Express
  public server: ReturnType<typeof createServer>
  public io: Server
  public port: string | number
  public webSocketService: WebSocketService

  constructor() {
    this.app = express()
    // 关键修复：端口必须与前端的连接地址一致
    this.port = process.env.PORT || 3001

    // 创建 HTTP 服务器
    this.server = createServer(this.app)

    this.server.on('listening', () => {
      console.log('✅ HTTP服务器启动成功')
      console.log('✅ Socket.IO服务器已初始化')
    })

    this.server.on('error', (error) => {
      const err = error as NodeJS.ErrnoException // 类型断言
      console.error('💥 服务器启动失败:', err)
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ 端口 ${this.port} 已被占用`)
        console.log('💡 尝试以下解决方案:')
        console.log('   1. 杀死占用端口的进程: lsof -ti:3001 | xargs kill -9')
        console.log('   2. 更改环境变量 PORT=3002')
        console.log('   3. 等待60秒后重试')
      }
    })

    // 初始化 Socket.IO 并配置 CORS
    this.io = new Server(this.server, {
      cors: {
        // 支持多个前端地址
        origin: process.env.FRONTEND_URL || [
          'http://localhost:8080',
          'http://localhost:3001',
          'http://localhost:5173' // Vite 默认端口
        ],
        methods: ['GET', 'POST'],
        credentials: true
      }
    })

    // 初始化 WebSocket 服务
    this.webSocketService = new WebSocketService(this.io)

    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  // 初始化中间件
  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || [
          'http://localhost:8080',
          'http://localhost:3001',
          'http://localhost:5173'
        ],
        credentials: true
      })
    )
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    // 添加请求日志中间件
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
      next()
    })
  }

  // 初始化路由
  private initializeRoutes(): void {
    // 健康检查路由
    this.app.get('/api/health', (req: Request, res: Response) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        websocket: 'Active'
      })
    })

    // WebSocket 连接测试路由
    this.app.get('/api/websocket-test', (req: Request, res: Response) => {
      res.json({
        websocketUrl: `ws://localhost:${this.port}`,
        status: 'Available'
      })
    })

    // API 路由
    this.app.use('/api/rolling-performance', rollingPerformanceRoutes)

    // 提供发布消息的 HTTP API
    this.app.post('/api/publish/:channel', (req: Request, res: Response) => {
      const { channel } = req.params
      const message = req.body

      try {
        this.webSocketService.publishToChannel(channel, message)
        res.json({
          success: true,
          message: `Published to channel: ${channel}`
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `发布失败: ${error}`
        })
      }
    })

    // 404 处理
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: `路由 ${req.originalUrl} 未找到`
      })
    })
  }

  // 错误处理
  private initializeErrorHandling(): void {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error('错误详情:', err)
        res.status(err.status || 500).json({
          success: false,
          message: err.message || '内部服务器错误',
          ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        })
      }
    )
  }

  // 启动服务
  public listen(): void {
    this.server.listen(this.port, () => {
      console.log('='.repeat(50))
      console.log(`🚀 后端服务器运行在 http://localhost:${this.port}`)
      console.log(`📡 WebSocket 服务运行在 ws://localhost:${this.port}`)
      console.log(`📊 环境: ${process.env.NODE_ENV || 'development'}`)
      console.log(
        `🎯 允许的前端地址: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`
      )
      console.log('='.repeat(50))
    })

    // 添加错误监听
    this.server.on('error', (error) => {
      const err = error as NodeJS.ErrnoException // 类型断言
      console.error('💥 服务器启动失败:', err)
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ 端口 ${this.port} 已被占用，请更换端口或关闭占用程序`)
      }
    })
  }
}

export default App
