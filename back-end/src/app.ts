// backend/src/app.ts
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rollingPerformanceRoutes from './routes/rollingPerformance'

// 加载环境变量
dotenv.config()

class App {
  public app: Express
  public port: string | number

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000

    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:8080',
        credentials: true
      })
    )

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes(): void {
    // 健康检查路由
    this.app.get('/api/health', (req: Request, res: Response) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      })
    })

    // API 路由
    this.app.use('/api/rolling-performance', rollingPerformanceRoutes)

    // 404 处理
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: `路由 ${req.originalUrl} 未找到`
      })
    })
  }

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

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 后端服务器运行在 http://localhost:${this.port}`)
      console.log(`📊 环境: ${process.env.NODE_ENV || 'development'}`)
    })
  }
}

export default App
