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

// 计算属性
// 可以添加需要的计算属性

// 方法
const showMessageTips = (titleName: string, messageInfo: string) => {
  ElMessageBox.alert(messageInfo, titleName, {
    confirmButtonText: '确定'
  })
}

const renderHeader = (h: any, { column, $index }: any) => {
  const span = document.createElement('span')
  span.innerText = column.label
  document.body.appendChild(span)
  column.minWidth = span.getBoundingClientRect().width + 50
  document.body.removeChild(span)
  return h('span', column.label)
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

const getPlanDetailActualData = async () => {
  const checkResult = checkTimeInRange(search.starDate, search.endDate, 1, 7)
  if (!checkResult) return

  if (isSearching.value) {
    showMessageTips('信息', '正在查询，请稍候再点击！')
    return
  }

  isSearching.value = true
  clickedButtonName.value = '1'

  try {
    // 这里替换为实际的API调用
    // const response = await axios.post('/api/LH/CB/GetPlanDetailActualData', search);
    // planDetailTableData.value = response.data;

    // 模拟数据
    planDetailTableData.value = []
    currentPage.value = 1

    planDetailTableConfig.value = [
      { label: 'L2坯料号', prop: 'L2坯料号', width: 140 },
      { label: '轧制计划号', prop: '轧制计划号' }
      // ... 其他列配置
    ]

    excelOutType.value = '1'
    excelOutData.value = [['L2坯料号', '轧制计划号' /* ... 其他列头 */]]
  } catch (error) {
    console.error('查询失败:', error)
    ElMessage.error('查询失败')
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
    // API调用代码
    planDetailTableData.value = []
    currentPage.value = 1

    planDetailTableConfig.value = [
      { label: '操作类型', prop: '操作类型', width: 100 },
      { label: '坯料号', prop: '坯料号', width: 140 }
      // ... 其他列配置
    ]

    excelOutType.value = '2'
    excelOutData.value = [['操作类型', '坯料号' /* ... 其他列头 */]]
  } catch (error) {
    console.error('查询失败:', error)
    ElMessage.error('查询失败')
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
    const paramsJson = {
      startDate: search.starDate,
      endDate: search.endDate,
      shiftGroup: search.shiftGroup,
      shiftNo: search.shiftNo,
      rollPlanNo: search.rollPlanNo || '',
      matNo: search.matNo || '',
      totalType: 1
    }

    // API调用代码
    planDetailTableData.value = []
    currentPage.value = 1

    planDetailTableConfig.value = [
      { label: '日期', prop: '日期', width: 250 },
      { label: '班次', prop: '班次', width: 150 }
      // ... 其他列配置
    ]

    excelOutType.value = '3'
    excelOutData.value = [['日期', '班次' /* ... 其他列头 */]]
  } catch (error) {
    console.error('查询失败:', error)
    ElMessage.error('查询失败')
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
    const paramsJson = {
      startDate: search.starDate,
      endDate: search.endDate,
      shiftGroup: search.shiftGroup,
      shiftNo: search.shiftNo,
      rollPlanNo: search.rollPlanNo || '',
      matNo: search.matNo || '',
      totalType: 2
    }

    // API调用代码
    planDetailTableData.value = []
    currentPage.value = 1

    planDetailTableConfig.value = [
      { label: '日期', prop: '日期', width: 250 },
      { label: '班组', prop: '班组', width: 150 }
      // ... 其他列配置
    ]

    excelOutType.value = '4'
    excelOutData.value = [['日期', '班组' /* ... 其他列头 */]]
  } catch (error) {
    console.error('查询失败:', error)
    ElMessage.error('查询失败')
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
  // 初始化操作
})
</script>

<style scoped>
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
