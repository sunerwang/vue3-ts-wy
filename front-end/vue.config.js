const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    host: '0.0.0.0', // 允许所有网络访问
    port: 8080,
    open: true
  }
}
