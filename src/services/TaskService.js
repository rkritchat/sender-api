const TaskDao = require('../dao/TaskDao')
const { addTaskValidator, findTaskValidator, deleteTaskValidator } = require('../common/validatior/TaskValidator')
const SdException = require('../common/exception/SdException')
const CommonRsModel = require('../models/CommonRsModel')
const { validateTaskIdAndUsername, deleteTask, findTaskByUsername, saveTask, findTaskById } = require('../helper/TaskHelper')

class TaskService {

    constructor() {
        this.taskDao = new TaskDao()
    }

    async addTask(req, res, next) {
        try {
            addTaskValidator(req.body)
            const { id } = await saveTask(req.body)
            res.send(await findTaskById(id))
        } catch (e) {
            next(new SdException(e.message))
        }
    }

    async findTask(req, res, next) {
        try {
            findTaskValidator(req.body)
            res.send(await findTaskByUsername(req.body))
        } catch (e) {
            next(new SdException(e.message))
        }
    }

    async deleteTask(req, res, next) {
        try {
            const body = req.body
            deleteTaskValidator(body)
            await validateTaskIdAndUsername(body)
            await deleteTask(body)
            res.send(new CommonRsModel('Delete task Successfully'))
        } catch (e) {
            next(new SdException(e.message))
        }
    }

}

module.exports = TaskService