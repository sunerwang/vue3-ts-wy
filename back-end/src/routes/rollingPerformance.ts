import { Router, Request, Response } from 'express'
import RollingPerformanceController from '../controllers/RollingPerformanceController'

const router = Router()

// 获取轧制性能数据
router.get('/', RollingPerformanceController.getRollingPerformanceData)

// 根据ID获取单条数据
router.get('/:id', RollingPerformanceController.getDataById)

// 创建新数据
router.post('/', RollingPerformanceController.createData)

// 更新数据
router.put('/:id', RollingPerformanceController.updateData)

// 删除数据
router.delete('/:id', RollingPerformanceController.deleteData)

export default router
