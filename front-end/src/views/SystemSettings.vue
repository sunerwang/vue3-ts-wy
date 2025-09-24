<template>
  <div>
    <h2 class="page-title">系统设置</h2>

    <el-form :model="form" label-width="120px">
      <el-form-item label="系统名称">
        <el-input v-model="form.name" placeholder="请输入系统名称"></el-input>
      </el-form-item>
      <el-form-item label="系统语言">
        <el-select v-model="form.language" placeholder="请选择系统语言">
          <el-option label="中文" value="zh"></el-option>
          <el-option label="英文" value="en"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时区设置">
        <el-select v-model="form.timezone" placeholder="请选择时区">
          <el-option label="北京时间 (UTC+8)" value="utc8"></el-option>
          <el-option label="格林威治时间 (UTC)" value="utc"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自动备份">
        <el-switch v-model="form.autoBackup"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSettings">保存设置</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = ref({
  name: '企业管理系统',
  language: 'zh',
  timezone: 'utc8',
  autoBackup: true
})

const saveSettings = () => {
  ElMessage.success('设置已保存')
}
</script>

<style scoped>
.page-title {
  color: #409eff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}
</style>
