const TaskDao = require('../dao/TaskDao')
const { addTaskValidator, findTaskValidator } = require('../common/validatior/TaskValidator')
const SdException = require('../common/exception/SdException')

class TaskService {

    constructor() {
        this.taskDao = new TaskDao()
    }

    async addTask(req, res, next) {
        try {
            addTaskValidator(req.body)
            const tmp = await this.taskDao.save(req.body)
            const result = await this.taskDao.findById(tmp.id)
            res.send(result)
        } catch (e) {
            next(new SdException(e.message))
        }
    }

    async find(req, res, next) {
        try {
            findTaskValidator(req.body)
            res.send(await this.taskDao.findByUsername(req.body.username))
        } catch (e) {
            next(new SdException(e.message))
        }
    }

}

module.exports = TaskService