import { Request, Response } from 'express'
import { RollingPerformanceService } from '../services/RollingPerformanceService'

export interface IApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

class RollingPerformanceController {
  private static service = new RollingPerformanceService()

  /**
   * 获取所有轧制性能数据
   */
  public static async getRollingPerformanceData(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await RollingPerformanceController.service.getAllData()

      const response: IApiResponse = {
        success: true,
        data: data
      }

      return res.json(response)
    } catch (error) {
      console.error('获取数据错误:', error)

      const response: IApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }

      return res.status(500).json(response)
    }
  }

  /**
   * 根据ID获取数据
   */
  public static async getDataById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID 参数不能为空'
        })
      }

      const data = await this.service.getDataById(parseInt(id))

      if (!data) {
        return res.status(404).json({
          success: false,
          error: '未找到对应数据'
        })
      }

      return res.json({
        success: true,
        data: data
      })
    } catch (error) {
      console.error('根据ID获取数据错误:', error)
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      })
    }
  }

  /**
   * 创建新数据
   */
  public static async createData(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const newData = req.body

      if (!newData) {
        return res.status(400).json({
          success: false,
          error: '请求体不能为空'
        })
      }

      const createdData = await this.service.createData(newData)

      return res.status(201).json({
        success: true,
        data: createdData,
        message: '数据创建成功'
      })
    } catch (error) {
      console.error('创建数据错误:', error)
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      })
    }
  }

  /**
   * 更新数据
   */
  public static async updateData(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params
      const updateData = req.body

      if (!id || !updateData) {
        return res.status(400).json({
          success: false,
          error: 'ID 和更新数据不能为空'
        })
      }

      const updatedData = await this.service.updateData(
        parseInt(id),
        updateData
      )

      return res.json({
        success: true,
        data: updatedData,
        message: '数据更新成功'
      })
    } catch (error) {
      console.error('更新数据错误:', error)
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      })
    }
  }

  /**
   * 删除数据
   */
  public static async deleteData(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID 参数不能为空'
        })
      }

      await this.service.deleteData(parseInt(id))

      return res.json({
        success: true,
        message: '数据删除成功'
      })
    } catch (error) {
      console.error('删除数据错误:', error)
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      })
    }
  }
}

export default RollingPerformanceController
