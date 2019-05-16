import express from 'express'
import taskService from '../services/taskService'

const router = express.Router()

router.route('/add').put(taskService.add)
router.route('/find').post(taskService.find)
export default router