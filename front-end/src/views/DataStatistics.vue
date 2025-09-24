<template>
  <div>
    <h2 class="page-title">数据统计</h2>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-statistic title="总用户数" :value="1234"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="今日新增" :value="12" suffix="人"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="订单总数" :value="5678"></el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="完成率" :value="93.5" suffix="%"></el-statistic>
      </el-col>
    </el-row>

    <div
      style="
        margin-top: 30px;
        height: 300px;
        background: #f9fafc;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
      "
    >
      <p>图表区域 - 这里可以放置ECharts等图表库</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 数据统计页面逻辑
</script>

<style scoped>
.page-title {
  color: #409eff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}
</style>
