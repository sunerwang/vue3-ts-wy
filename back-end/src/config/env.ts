export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    host: process.env.DB_HOST || '140.32.0.72',
    port: parseInt(process.env.DB_PORT || '50000'),
    name: process.env.DB_NAME || 'L2GX',
    user: process.env.DB_USER || 'L2GX',
    password: process.env.DB_PASSWORD || 'L2GX'
  },

  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:8080'
  }
}
export default config
