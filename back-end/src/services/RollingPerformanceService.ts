// RollingPerformanceService.ts
import { DbService } from './DbService'

export interface IRollingPerformanceData {
  // 根据SQL查询结果定义完整接口
  L2坯料号: string
  成品规格: string
  钢种: string
  打捆用时: number
  打捆档位: number
  打捆时间: string
  打捆卷长: number
  实绩处理区分: number
  轧制计划号: string
  材料号: string
  PONO号: string
  轧制生产班次: string
  轧制生产班组: string
  轧制生产时刻: string
  轧制生产责任者: string
  轧制开始时刻: string
  轧制结束时刻: string
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
  // 其他字段根据SQL查询结果添加...
}

export class RollingPerformanceService {
  private dbService: DbService

  constructor() {
    this.dbService = new DbService()
  }

  /**
   * 获取轧制实绩明细数据 - 对应GetPlanDetailActualData方法
   */
  public async getPlanDetailActualData(
    startDate: string,
    endDate: string,
    shiftNo: string,
    shiftGroup: string,
    rollPlanNo: string,
    matNo: string
  ): Promise<IRollingPerformanceData[]> {
    try {
      // 构建基础SQL
      let sql = `select
    l3arf.SLAN_NO AS L2坯料号,
    lms.OUT_MAT_THICK AS 成品规格,
    lms.SG_SIGN AS 钢种,
    LMD.PACK_USED_TIME AS 打捆用时,
    LMD.PACK_PRESS AS 打捆档位,
    to_char(LMD.PACK_DATE,'yyyy-mm-dd hh24:mi:ss') AS 打捆时间,
    LMD.PACK_LENGTH AS 打捆卷长,
    l3arf.OPERATE_DIV AS 实绩处理区分,
    l3arf.ROLL_PLAN_NO AS 轧制计划号,
    l3arf.MAT_NO AS 材料号,
    l3arf.PONO AS PONO号,
    CASE l3arf.PROD_SHIFT_NO
        WHEN '1' THEN '夜'
        WHEN '2' THEN '白'
        WHEN '3' THEN '中'
    END AS 轧制生产班次,
    CASE l3arf.PROD_SHIFT_GROUP
        WHEN '1' THEN '甲'
        WHEN '2' THEN '乙'
        WHEN '3' THEN '丙'
        WHEN '4' THEN '丁'
    END AS 轧制生产班组,
    to_char(to_date(l3arf.PROD_TIME,'yyyymmddhh24miss'),'yyyy-mm-dd hh24:mi:ss') AS 轧制生产时刻,
    l3arf.PROD_MAKER AS 轧制生产责任者,
    to_char(to_date(l3arf.ROLL_START_TIME,'yyyymmddhh24miss'),'yyyy-mm-dd hh24:mi:ss') AS 轧制开始时刻,
    to_char(to_date(l3arf.ROLL_END_TIME,'yyyymmddhh24miss'),'yyyy-mm-dd hh24:mi:ss') AS 轧制结束时刻,
    l3arf.ROLL_TIME AS 轧制时间,
    l3arf.IN_MAT_LEN AS 入口材料长度,
    l3arf.IN_MAT_ACT_WT AS 入口材料实际重量,
    l3arf.MAT_ACT_THICK AS 材料实际厚度,
    l3arf.MAT_ACT_WIDTH AS 材料实际宽度,
    l3arf.MAT_ACT_LEN AS 材料实际长度,
    l3arf.MAT_ACT_INNER_DIA AS 材料实际内径,
    l3arf.MAT_ACT_OUTER_DIA AS 材料实际外径,
    l3arf.ROLL_MAT_NUM AS 轧制根数,
    l3arf.ROLL_ACT_WT AS 轧制实际重量,
    l3arf.ROLL_THEORY_WT AS 轧制理论重量
    from L3_ACT_ROLL_FINISH l3arf
    LEFT JOIN L2_MILL_SCHEDU lms on l3arf.ROLL_PLAN_NO = lms.ROLL_PLAN_NO
    LEFT JOIN L2_MILL_DATA lmd ON LMD.MAT_NO = l3arf.MAT_NO
    WHERE 1=1 and l3arf.OPERATE_DIV = 0`
      // 添加查询条件
      const params: any[] = []

      if (startDate && endDate) {
        sql += ` AND l3arf.ROLL_START_TIME IS NOT NULL
                and to_date(l3arf.ROLL_START_TIME,'yyyy-mm-dd hh24:mi:ss') >= to_date(?,'yyyy-mm-dd hh24:mi:ss')
                and to_date(l3arf.ROLL_START_TIME,'yyyy-mm-dd hh24:mi:ss') <= to_date(?,'yyyy-mm-dd hh24:mi:ss')`
        params.push(startDate, endDate)
      } else if (startDate && !endDate) {
        sql += ` AND l3arf.ROLL_START_TIME IS NOT NULL
                and to_date(l3arf.ROLL_START_TIME,'yyyy-mm-dd hh24:mi:ss') >= to_date(?,'yyyy-mm-dd hh24:mi:ss')
                and to_date(l3arf.ROLL_START_TIME,'yyyy-mm-dd hh24:mi:ss') <= current_timestamp + 1`
        params.push(startDate)
      }

      if (rollPlanNo) {
        sql += ` and l3arf.ROLL_PLAN_NO like ?`
        params.push(`%${rollPlanNo}%`)
      }

      if (shiftNo) {
        sql += ` and l3arf.PROD_SHIFT_NO = ?`
        params.push(shiftNo)
      }

      if (shiftGroup) {
        sql += ` and l3arf.PROD_SHIFT_GROUP = ?`
        params.push(shiftGroup)
      }

      if (matNo) {
        sql += ` and l3arf.SLAN_NO like ?`
        params.push(`%${matNo}%`)
      }

      if (!startDate && !shiftNo && !shiftGroup && !rollPlanNo && !matNo) {
        sql += ` and l3arf.TOC > current_timestamp - 3`
      }

      sql += ` order by l3arf.ROLL_START_TIME desc`


      // sql = `SELECT * FROM  L3_ACT_ROLL_FINISH `
      sql = 'select * from (' + sql + ') where ROWNUM <= 500' // 限制返回行数，防止数据过多

      const result = await this.dbService.query(sql, params)
      return result as IRollingPerformanceData[]
    } catch (error) {
      throw new Error(
        `获取轧制实绩数据失败: ${error instanceof Error ? error.message : '未知错误'}`
      )
    }
  }

  /**
   * 获取轧废实绩数据 - 对应getRollScrapActualData方法
   */
  public async getRollScrapActualData(
    startDate: string,
    endDate: string,
    shiftNo: string,
    shiftGroup: string,
    rollPlanNo: string,
    matNo: string
  ): Promise<any[]> {
    try {
      // 实现轧废查询逻辑
      const sql = `SELECT * FROM L3_ACT_ROLL_SCRAP WHERE 1=1`
      // 添加具体的查询条件和逻辑
      const result = await this.dbService.query(sql, [])
      return result
    } catch (error) {
      throw new Error(
        `获取轧废实绩数据失败: ${error instanceof Error ? error.message : '未知错误'}`
      )
    }
  }

  /**
   * 获取班产统计数据 - 对应getShiftMatrTotalActualData方法
   */
  public async getShiftMatrTotalActualData(params: {
    startDate: string
    endDate: string
    shiftGroup: string
    shiftNo: string
    rollPlanNo: string
    matNo: string
    totalType: number
  }): Promise<any[]> {
    try {
      // 实现班产统计逻辑
      const sql = `SELECT
        PROD_DATE as 日期,
        PROD_SHIFT_NO as 班次,
        PROD_SHIFT_GROUP as 班组,
        COUNT(*) as 轧制数量,
        SUM(ROLL_ACT_WT) as 轧制总重
        FROM L3_ACT_ROLL_FINISH
        WHERE 1=1`
      // 添加具体的查询条件和逻辑
      const result = await this.dbService.query(sql, [])
      return result
    } catch (error) {
      throw new Error(
        `获取班产统计数据失败: ${error instanceof Error ? error.message : '未知错误'}`
      )
    }
  }

  /**
   * 获取所有数据（简化版）
   */
  public async getAllData(): Promise<IRollingPerformanceData[]> {
    return this.getPlanDetailActualData('', '', '', '', '', '')
  }

  /**
   * 根据ID获取数据
   */
  public async getDataById(id: number): Promise<IRollingPerformanceData | null> {
    try {
      const sql = `SELECT * FROM L3_ACT_ROLL_FINISH WHERE ID = ?`
      const result = await this.dbService.query(sql, [id])
      return result.length > 0 ? (result[0] as IRollingPerformanceData) : null
    } catch (error) {
      throw new Error(
        `根据ID获取数据失败: ${error instanceof Error ? error.message : '未知错误'}`
      )
    }
  }

  /**
   * 创建数据
   */
  public async createData(data: Omit<IRollingPerformanceData, 'id'>): Promise<IRollingPerformanceData> {
    try {
      // 实现插入逻辑
      const sql = `INSERT INTO L3_ACT_ROLL_FINISH (...) VALUES (...)`
      await this.dbService.query(sql, [])
      return { ...data } as IRollingPerformanceData
    } catch (error) {
      throw new Error(
        `创建数据失败: ${error instanceof Error ? error.message : '未知错误'}`
      )
    }
  }

  /**
   * 更新数据
   */
  public async updateData(id: number, data: Partial<IRollingPerformanceData>): Promise<IRollingPerformanceData> {
    try {
      const sql = `UPDATE L3_ACT_ROLL_FINISH SET ... WHERE ID = ?`
      await this.dbService.query(sql, [id])
      return { ...data } as IRollingPerformanceData
    } catch (error) {
      throw new Error(
        `更新数据失败: ${error instanceof Error ? error.message : '未知错误'}`
      )
    }
  }

  /**
   * 删除数据
   */
  public async deleteData(id: number): Promise<void> {
    try {
      const sql = `DELETE FROM L3_ACT_ROLL_FINISH WHERE ID = ?`
      await this.dbService.query(sql, [id])
    } catch (error) {
      throw new Error(
        `删除数据失败: ${error instanceof Error ? error.message : '未知错误'}`
      )
    }
  }
}
