<template>
  <div id="LHCB07app">
    <el-row>
      <el-col class="topic-div" :span="24">
        <span>查询条件</span>
        <el-row>
          <el-col class="px-2" :span="1">
            <el-row class="line-height">
              <el-checkbox v-model="search.checkDate" @change="changeDate"
                >时间</el-checkbox
              >
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col class="text-right line-height" :span="6"
                >起始时间：</el-col
              >
              <el-col :span="18">
                <el-date-picker
                  class="el-col-24"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :disabled="disabledDate"
                  placeholder="请选择起始时间"
                  v-model="search.starDate"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col class="text-right line-height" :span="6"
                >结束时间：</el-col
              >
              <el-col :span="18">
                <el-date-picker
                  class="el-col-24"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :disabled="disabledDate"
                  placeholder="请选择起始时间"
                  v-model="search.endDate"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-row>
              <el-col class="px-2" :span="6">
                <el-button
                  class="el-col-24 ml-0"
                  type="primary"
                  :class="{ 'button-Clicked': clickedButtonName === '1' }"
                  @click="getPlanDetailActualData()"
                >
                  轧制实绩查询
                </el-button>
              </el-col>
              <el-col class="px-2" :span="6">
                <el-button
                  class="el-col-24 ml-0"
                  type="primary"
                  :class="{ 'button-Clicked': clickedButtonName === '2' }"
                  @click="getRollScrapActualData()"
                >
                  轧废查询
                </el-button>
              </el-col>
              <el-col class="px-2" :span="6">
                <el-button
                  class="el-col-24 ml-0"
                  type="primary"
                  :class="{ 'button-Clicked': clickedButtonName === '3' }"
                  @click="getShiftMatrTotalActualData()"
                >
                  班产统计
                </el-button>
              </el-col>
              <el-col class="px-2" :span="6">
                <el-button
                  class="el-col-24 ml-0"
                  type="primary"
                  :class="{ 'button-Clicked': clickedButtonName === '4' }"
                  @click="getMonthMatrTotalActualData()"
                >
                  月产统计
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row class="mt-2">
          <el-col class="px-2" :span="1">
            <el-row class="line-height">
              <el-checkbox v-model="search.checkShiftNo" @change="changeShiftNo"
                >班次：</el-checkbox
              >
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col :span="20">
                <el-select
                  class="low el-col-24 text-center"
                  v-model="search.shiftNo"
                  placeholder="请选择"
                  :disabled="disableShiftNo"
                >
                  <el-option
                    class="low text-center"
                    v-for="item in shiftSelectData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="px-2" :span="1">
            <el-row class="line-height">
              <el-checkbox
                v-model="search.checkShiftGroup"
                @change="changeShiftGroup"
                >班组：</el-checkbox
              >
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col class="low" :span="20">
                <el-select
                  class="low el-col-24 text-center"
                  v-model="search.shiftGroup"
                  placeholder="请选择"
                  :disabled="disableShiftGroup"
                >
                  <el-option
                    class="low text-center"
                    v-for="item in shiftGroupSelectData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="pl-4" :span="2">
            <el-row class="line-height">
              <el-checkbox
                v-model="search.checkRollPlanNo"
                @change="changeRollPlanNo"
                >轧制计划号：</el-checkbox
              >
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col :span="20">
                <el-input
                  class="low el-col-24"
                  v-model="search.rollPlanNo"
                  :disabled="disabledRollPlanNo"
                ></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="line-height" :span="1">
            <el-checkbox v-model="search.checkMatNo" @change="changeMatNo"
              >坯料号：</el-checkbox
            >
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col class="low" :span="20">
                <el-input
                  class="low el-col-24"
                  v-model="search.matNo"
                  :disabled="disabledMatNo"
                ></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col class="px-2" :span="6">
                <el-button
                  class="el-col-24 ml-0"
                  type="primary"
                  @click="handleExcel(excelOutType)"
                  >导出</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-col class="topic-div" :span="24">
          <span>查询结果</span>
          <el-row class="px-2 my-2">
            <el-table
              border
              :data="
                planDetailTableData.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              height="580"
              highlight-current-row
              header-row-class-name="jy-header-row"
              header-cell-class-name="jy-header-cell"
              row-class-name="jy-row"
              cell-class-name="jy-cell"
              @row-click="planDetailTableClick"
            >
              <el-table-column
                v-for="config in planDetailTableConfig"
                :key="config.prop"
                :render-header="renderHeader"
                :label="config.label"
                :prop="config.prop"
                :width="config.width"
                :formatter="config.formatter"
              ></el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="16">
        <el-pagination
          background
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="currentPage"
          :page-sizes="[10, 20, 40, 80, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="planDetailTableData.length"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'
import * as XLSX from 'xlsx'

// 类型定义
interface SearchParams {
  checkDate: boolean
  checkShiftGroup: boolean
  checkShiftNo: boolean
  checkRollPlanNo: boolean
  checkMatNo: boolean
  starDate: string
  endDate: string
  shiftNo: string
  shiftGroup: string
  rollPlanNo: string
  matNo: string
}

interface TableColumnConfig {
  label: string
  prop: string
  width?: number
  formatter?: (row: any, column: any, cellValue: any, index: number) => string
}

interface SelectOption {
  value: string
  label: string
}

interface RollingPerformanceData {
  'L2坯料号\n': string
  成品规格: number
  钢种: string
  打捆用时: number | null
  打捆档位: number
  打捆时间: string
  打捆卷长: number
  实绩处理区分: string
  '轧制计划号\n': string
  '材料号\n': string
  'PONO号\n': string
  轧制生产班次: string
  轧制生产班组: string
  轧制生产时刻: string
  '轧制生产责任者\n': string
  ROLL_START_TIME: string
  ROLL_END_TIME: string
  轧制时间: number
  入口材料长度: number
  入口材料实际重量: number
  材料实际厚度: number
  材料实际宽度: number
  材料实际长度: number
  材料实际内径: number
  材料实际外径: number
  轧制根数: number
  轧制实际重量: number
  轧制理论重量: number
}

interface ApiResponse {
  success: boolean
  data: RollingPerformanceData[]
}

// 响应式数据
const search = reactive<SearchParams>({
  checkDate: false,
  checkShiftGroup: false,
  checkShiftNo: false,
  checkRollPlanNo: false,
  checkMatNo: false,
  starDate: '',
  endDate: '',
  shiftNo: '',
  shiftGroup: '',
  rollPlanNo: '',
  matNo: ''
})

const disabledDate = ref(true)
const disableShiftNo = ref(true)
const disableShiftGroup = ref(true)
const disabledRollPlanNo = ref(true)
const disabledMatNo = ref(true)

const planTableData = ref<any[]>([])
const planDetailRollPlanNo = ref('')
const planDetailTableConfig = ref<TableColumnConfig[]>([])
const planDetailTableData = ref<any[]>([])

const shiftSelectData: SelectOption[] = [
  { value: '1', label: '夜' },
  { value: '2', label: '白' },
  { value: '3', label: '中' }
]

const shiftGroupSelectData: SelectOption[] = [
  { value: '1', label: '甲' },
  { value: '2', label: '乙' },
  { value: '3', label: '丙' },
  { value: '4', label: '丁' }
]

const currentPage = ref(1)
const pageSize = ref(10)
const excelOutType = ref('1')
const downloadLoading = ref(false)
const excelOutData = ref<any[]>([])
const sendMESTitle = ref('补发出口材料号：')
const sendMESMatNo = ref('')
const clickedButtonName = ref('')
const isSearching = ref(false)
const multipleSelection = ref<any>(null)

// 方法
const showMessageTips = (titleName: string, messageInfo: string) => {
  ElMessageBox.alert(messageInfo, titleName, {
    confirmButtonText: '确定'
  })
}

const renderHeader = (params?: any) => {
  if (!params || !params.column) {
    // 参数异常时返回默认内容
    return ''
  }
  const { column } = params
  // 计算最小宽度逻辑可保留
  const span = document.createElement('span')
  span.innerText = column.label
  document.body.appendChild(span)
  column.minWidth = span.getBoundingClientRect().width + 50
  document.body.removeChild(span)
  return column.label
}

const planDetailTableClick = (val: any) => {
  multipleSelection.value = val
  getTableSelected()
}

const getTableSelected = () => {
  if (excelOutType.value === '1' || excelOutType.value === '2') {
    sendMESMatNo.value = multipleSelection.value?.['出口材料号'] || ''
  } else if (excelOutType.value === '3') {
    sendMESMatNo.value = multipleSelection.value?.['坯料号'] || ''
  }
}

const changeDate = (val: boolean) => {
  disabledDate.value = !val
  search.starDate = ''
  search.endDate = ''
}

const changeShiftGroup = (val: boolean) => {
  disableShiftGroup.value = !val
  search.shiftGroup = ''
}

const changeShiftNo = (val: boolean) => {
  disableShiftNo.value = !val
  search.shiftNo = ''
}

const changeRollPlanNo = (val: boolean) => {
  disabledRollPlanNo.value = !val
  search.rollPlanNo = ''
}

const changeMatNo = (val: boolean) => {
  disabledMatNo.value = !val
  search.matNo = ''
}

const changeSize = (size: number) => {
  pageSize.value = size
  console.log('每页 ' + size + ' 条')
}

const changePage = (page: number) => {
  currentPage.value = page
  console.log('当前页: ' + page)
}

const checkTimeInRange = (
  startDate: string,
  endDate: string,
  timeType: number,
  timeValue: number
): boolean => {
  if (!startDate || !endDate) return true

  const dateBegin = new Date(startDate.replace(/-/g, '/'))
  const dateEnd = new Date(endDate.replace(/-/g, '/'))

  const dateDiff = new Date(dateBegin)
  let tipsMessage = ''

  if (timeType === 1) {
    dateDiff.setDate(dateBegin.getDate() + timeValue)
    tipsMessage = '请查询起始时间后' + timeValue + '天内的数据！'
  } else if (timeType === 2) {
    dateDiff.setMonth(dateBegin.getMonth() + timeValue)
    tipsMessage = '请查询起始时间后' + timeValue + '个月内的数据！'
  }

  const compareDate = dateEnd > dateDiff || dateEnd <= dateBegin
  if (compareDate) {
    showMessageTips('警告', tipsMessage)
    return false
  }

  return true
}

const timeFormat = (
  row: any,
  column: any,
  cellValue: any,
  index: number
): string => {
  if (!cellValue) return ''
  return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
}

// API调用函数
const fetchRollingPerformanceData = async (): Promise<
  RollingPerformanceData[]
> => {
  try {
    const response = await fetch(
      'http://localhost:3001/api/rolling-performance'
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse = await response.json()

    if (result.success && result.data) {
      return result.data
    } else {
      throw new Error('API返回数据格式错误')
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    throw error
  }
}

const getPlanDetailActualData = async () => {
  if (search.checkDate) {
    const checkResult = checkTimeInRange(search.starDate, search.endDate, 1, 7)
    if (!checkResult) return
  }

  if (isSearching.value) {
    showMessageTips('信息', '正在查询，请稍候再点击！')
    return
  }

  isSearching.value = true
  clickedButtonName.value = '1'

  try {
    // 调用API获取数据
    const data = await fetchRollingPerformanceData()
    planDetailTableData.value = data
    currentPage.value = 1

    // 设置表格列配置
    planDetailTableConfig.value = [
      { label: 'L2坯料号', prop: 'L2坯料号\n', width: 140 },
      { label: '轧制计划号', prop: '轧制计划号\n', width: 120 },
      { label: '材料号', prop: '材料号\n', width: 120 },
      { label: 'PONO号', prop: 'PONO号\n', width: 100 },
      { label: '成品规格', prop: '成品规格', width: 100 },
      { label: '钢种', prop: '钢种', width: 100 },
      { label: '轧制生产班次', prop: '轧制生产班次', width: 120 },
      { label: '轧制生产班组', prop: '轧制生产班组', width: 120 },
      {
        label: '轧制生产时刻',
        prop: '轧制生产时刻',
        width: 160,
        formatter: timeFormat
      },
      { label: '轧制生产责任者', prop: '轧制生产责任者\n', width: 120 },
      {
        label: '轧制开始时间',
        prop: 'ROLL_START_TIME',
        width: 160,
        formatter: timeFormat
      },
      {
        label: '轧制结束时间',
        prop: 'ROLL_END_TIME',
        width: 160,
        formatter: timeFormat
      },
      { label: '轧制时间(秒)', prop: '轧制时间', width: 120 },
      { label: '入口材料长度', prop: '入口材料长度', width: 120 },
      { label: '入口材料实际重量', prop: '入口材料实际重量', width: 140 },
      { label: '轧制实际重量', prop: '轧制实际重量', width: 120 },
      { label: '轧制理论重量', prop: '轧制理论重量', width: 120 },
      { label: '轧制根数', prop: '轧制根数', width: 100 }
    ]

    // 设置导出数据
    excelOutType.value = '1'
    if (data.length > 0) {
      // 获取所有列头
      const headers = planDetailTableConfig.value.map((config) => config.label)
      excelOutData.value = [headers]

      // 添加数据行
      data.forEach((item) => {
        const row = planDetailTableConfig.value.map((config) => {
          const prop = config.prop as keyof RollingPerformanceData
          return item[prop] || ''
        })
        excelOutData.value.push(row)
      })
    } else {
      excelOutData.value = []
    }

    ElMessage.success(`查询成功，共 ${data.length} 条数据`)
  } catch (error) {
    console.error('查询失败:', error)
    ElMessage.error('查询失败，请检查网络连接或API服务')
  } finally {
    isSearching.value = false
  }
}

const getRollScrapActualData = async () => {
  if (isSearching.value) {
    showMessageTips('信息', '正在查询，请稍候再点击！')
    return
  }

  isSearching.value = true
  clickedButtonName.value = '2'

  try {
    // 这里可以根据需要调用不同的API，暂时使用相同的API
    const data = await fetchRollingPerformanceData()
    planDetailTableData.value = data
    currentPage.value = 1

    // 设置轧废查询的表格列配置
    planDetailTableConfig.value = [
      { label: 'L2坯料号', prop: 'L2坯料号\n', width: 140 },
      { label: '轧制计划号', prop: '轧制计划号\n', width: 120 },
      { label: '钢种', prop: '钢种', width: 100 },
      {
        label: '轧制生产时刻',
        prop: '轧制生产时刻',
        width: 160,
        formatter: timeFormat
      },
      { label: '轧制时间(秒)', prop: '轧制时间', width: 120 },
      { label: '轧制实际重量', prop: '轧制实际重量', width: 120 },
      { label: '实绩处理区分', prop: '实绩处理区分', width: 120 }
    ]

    excelOutType.value = '2'
    if (data.length > 0) {
      const headers = planDetailTableConfig.value.map((config) => config.label)
      excelOutData.value = [headers]

      data.forEach((item) => {
        const row = planDetailTableConfig.value.map((config) => {
          const prop = config.prop as keyof RollingPerformanceData
          return item[prop] || ''
        })
        excelOutData.value.push(row)
      })
    } else {
      excelOutData.value = []
    }

    ElMessage.success(`轧废查询成功，共 ${data.length} 条数据`)
  } catch (error) {
    console.error('轧废查询失败:', error)
    ElMessage.error('轧废查询失败')
  } finally {
    isSearching.value = false
  }
}

const getShiftMatrTotalActualData = async () => {
  if (isSearching.value) {
    showMessageTips('信息', '正在查询，请稍候再点击！')
    return
  }

  isSearching.value = true
  clickedButtonName.value = '3'

  try {
    // 班产统计 - 可以使用相同的API，在前端进行数据聚合
    const data = await fetchRollingPerformanceData()

    // 简单示例：按班次分组统计
    const shiftStats = data.reduce((acc, item) => {
      const shift = item.轧制生产班次
      if (!acc[shift]) {
        acc[shift] = {
          班次: shift,
          生产数量: 0,
          总重量: 0,
          平均轧制时间: 0
        }
      }
      acc[shift].生产数量 += 1
      acc[shift].总重量 += item.轧制实际重量
      return acc
    }, {} as any)

    planDetailTableData.value = Object.values(shiftStats)
    currentPage.value = 1

    planDetailTableConfig.value = [
      { label: '班次', prop: '班次', width: 100 },
      { label: '生产数量', prop: '生产数量', width: 100 },
      { label: '总重量(kg)', prop: '总重量', width: 120 },
      { label: '平均轧制时间(秒)', prop: '平均轧制时间', width: 140 }
    ]

    excelOutType.value = '3'
    if (planDetailTableData.value.length > 0) {
      const headers = planDetailTableConfig.value.map((config) => config.label)
      excelOutData.value = [headers]

      planDetailTableData.value.forEach((item) => {
        const row = planDetailTableConfig.value.map((config) => {
          return item[config.prop] || ''
        })
        excelOutData.value.push(row)
      })
    } else {
      excelOutData.value = []
    }

    ElMessage.success('班产统计查询成功')
  } catch (error) {
    console.error('班产统计查询失败:', error)
    ElMessage.error('班产统计查询失败')
  } finally {
    isSearching.value = false
  }
}

const getMonthMatrTotalActualData = async () => {
  if (isSearching.value) {
    showMessageTips('信息', '正在查询，请稍候再点击！')
    return
  }

  isSearching.value = true
  clickedButtonName.value = '4'

  try {
    // 月产统计 - 可以使用相同的API，在前端进行数据聚合
    const data = await fetchRollingPerformanceData()

    // 简单示例：按月份分组统计
    const monthStats = data.reduce((acc, item) => {
      const date = new Date(item.轧制生产时刻)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`

      if (!acc[monthKey]) {
        acc[monthKey] = {
          月份: monthKey,
          生产数量: 0,
          总重量: 0
        }
      }
      acc[monthKey].生产数量 += 1
      acc[monthKey].总重量 += item.轧制实际重量
      return acc
    }, {} as any)

    planDetailTableData.value = Object.values(monthStats)
    currentPage.value = 1

    planDetailTableConfig.value = [
      { label: '月份', prop: '月份', width: 100 },
      { label: '生产数量', prop: '生产数量', width: 100 },
      { label: '总重量(kg)', prop: '总重量', width: 120 }
    ]

    excelOutType.value = '4'
    if (planDetailTableData.value.length > 0) {
      const headers = planDetailTableConfig.value.map((config) => config.label)
      excelOutData.value = [headers]

      planDetailTableData.value.forEach((item) => {
        const row = planDetailTableConfig.value.map((config) => {
          return item[config.prop] || ''
        })
        excelOutData.value.push(row)
      })
    } else {
      excelOutData.value = []
    }

    ElMessage.success('月产统计查询成功')
  } catch (error) {
    console.error('月产统计查询失败:', error)
    ElMessage.error('月产统计查询失败')
  } finally {
    isSearching.value = false
  }
}

const sheet2blob = (sheet: any, sheetName?: string): Blob => {
  sheetName = sheetName || 'sheet1'
  const workbook = {
    SheetNames: [sheetName],
    Sheets: { [sheetName]: sheet }
  }

  const wopts = {
    bookType: 'xlsx' as const,
    bookSST: false,
    type: 'binary' as const
  }

  const wbout = XLSX.write(workbook, wopts)

  const s2ab = (s: string): ArrayBuffer => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  }

  return new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
}

const openDownloadDialog = (url: string | Blob, saveName?: string) => {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url)
  }

  const aLink = document.createElement('a')
  aLink.href = url as string
  aLink.download = saveName || ''

  const event = new MouseEvent('click')
  aLink.dispatchEvent(event)
}

const handleExcel = (outType: string) => {
  if (excelOutData.value.length <= 0) {
    ElMessage.error('请先查询数据，然后再导出！')
    return
  }

  downloadLoading.value = true

  try {
    const sheet = XLSX.utils.aoa_to_sheet(excelOutData.value)
    let fileName = ''

    switch (outType) {
      case '1':
        fileName = '轧制实绩导出.xlsx'
        break
      case '2':
        fileName = '轧废实绩导出.xlsx'
        break
      case '3':
        fileName = '轧机班产统计导出.xlsx'
        break
      case '4':
        fileName = '轧机月产统计导出.xlsx'
        break
      default:
        fileName = '导出.xlsx'
    }

    openDownloadDialog(sheet2blob(sheet), fileName)
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  } finally {
    downloadLoading.value = false
  }
}

const btnSendToL3 = (outType: string, matNo: string) => {
  if (excelOutData.value.length <= 0) {
    ElMessage.error('请先查询数据，然后再选中数据进行补发！')
    return
  }

  let sendType = '4'
  if (outType === '1') {
    console.log('轧制实绩补发' + matNo)
    sendType = '4'
  } else if (outType === '2') {
    console.log('轧废实绩补发' + matNo)
    sendType = '8'
  }

  // 调用补发API
  // sendTestActual('2', sendType, matNo);
}

// 生命周期
onMounted(() => {
  // 初始化操作 - 可以在这里加载初始数据
  // getPlanDetailActualData()
})
</script>

<style scoped>
/* 原有的样式保持不变 */
html,
body {
  background-color: #c6ffff;
  margin: 0 0.5rem;
}

/* 外边框 统一样式*/
.topic-div {
  position: relative;
  border: 1px solid gray;
  min-height: 3.5rem;
  border-radius: 10px;
  padding: 0.5rem 0.5rem 0rem 0.5rem;
  margin-top: 1rem;
}

.topic-div > span {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  padding: 0 0.5rem;
  background-color: #adf7e8;
  color: blue;
  font-weight: bold;
}

/*  表格 统一样式  */
.jy-header-cell {
  background-color: skyblue !important;
}

.jy-header-cell .cell {
  text-align: center;
  color: blue;
  white-space: pre;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.jy-cell {
  height: 32px;
}

.jy-cell .cell {
  text-align: center;
}

/*改变element ui 高亮table当前行*/
.el-table__body tr.current-row > td {
  background-color: #aac5e3 !important;
}

/* 输入框 样式统一 */
input {
  text-align: center;
}

.line-height {
  line-height: 40px;
}

.el-table tr {
  font-size: 20px;
  font-weight: 700;
}

/*按钮鼠标悬停变色*/
.el-button--primary:focus,
.el-button--primary:hover {
  background: rgb(230, 162, 60);
  border-color: rgb(230, 162, 60);
  color: #fff;
}

/*按钮点击激活变色*/
.button-Clicked {
  background: rgb(230, 162, 60) !important;
  border-color: rgb(230, 162, 60) !important;
  color: #fff;
}
</style>
