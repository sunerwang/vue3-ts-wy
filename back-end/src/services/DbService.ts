import * as ibmDb from 'ibm_db'
import config from '../config/env'

export interface IDbConfig {
  database: string
  hostname: string
  port: number
  username: string
  password: string
}

export class DbService {
  private config: IDbConfig
  private connection: any = null

  constructor() {
    this.config = {
      database: config.database.name,
      hostname: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password
    }
  }

  /**
   * 获取数据库连接字符串
   */
  private getConnectionString(): string {
    return `DATABASE=${this.config.database};HOSTNAME=${this.config.hostname};PORT=${this.config.port};UID=${this.config.username};PWD=${this.config.password};PROTOCOL=TCPIP`
  }

  /**
   * 连接数据库
   */
  public async connect(): Promise<any> {
    try {
      if (!this.connection) {
        this.connection = await ibmDb.open(this.getConnectionString())
        console.log('✅ 数据库连接成功')
      }
      return this.connection
    } catch (error) {
      console.error('❌ 数据库连接失败:', error)
      throw error
    }
  }

  /**
   * 关闭数据库连接
   */
  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close()
      this.connection = null
      console.log('✅ 数据库连接已关闭')
    }
  }

  /**
   * 执行查询
   */
  public async query(sql: string, params: any[] = []): Promise<any[]> {
    const conn = await this.connect()
    try {
      const result = await conn.query(sql, params)
      return result
    } catch (error) {
      console.error('查询执行失败:', error)
      throw error
    }
  }
}
