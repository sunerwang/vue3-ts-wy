<template>
  <div class="welcome-section">
    <h2>欢迎使用企业管理系统</h2>
    <p>
      这是一个基于Vue3、TypeScript、Element Plus和Vue
      Router构建的现代化管理系统。系统提供了用户管理、数据统计、系统设置等功能模块。
    </p>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div style="display: flex; align-items: center">
              <el-icon><User /></el-icon>
              <span style="margin-left: 10px">系统统计</span>
            </div>
          </template>
          <div>
            <p>今日活跃用户: 1,254</p>
            <p>新增订单: 89</p>
            <p>系统运行时间: 15天</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div style="display: flex; align-items: center">
              <el-icon><Setting /></el-icon>
              <span style="margin-left: 10px">快速操作</span>
            </div>
          </template>
          <div>
            <el-button type="primary" style="margin: 5px">用户管理</el-button>
            <el-button type="success" style="margin: 5px">数据报表</el-button>
            <el-button type="warning" style="margin: 5px">系统设置</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="feature-cards">
      <div class="feature-card">
        <h3>用户管理</h3>
        <p>管理系统的用户账户、权限和角色分配。</p>
      </div>
      <div class="feature-card">
        <h3>数据统计</h3>
        <p>查看和分析系统内的各项数据指标。</p>
      </div>
      <div class="feature-card">
        <h3>系统设置</h3>
        <p>配置系统参数和个性化选项。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.welcome-section {
  text-align: center;
  padding: 40px 20px;
}

.welcome-section h2 {
  color: #409eff;
  margin-bottom: 20px;
  font-size: 28px;
}

.welcome-section p {
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 30px;
  color: #666;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.feature-card {
  padding: 20px;
  border-radius: 8px;
  background: #f9fafc;
  border-left: 4px solid #409eff;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #409eff;
  margin-bottom: 10px;
}
</style>
