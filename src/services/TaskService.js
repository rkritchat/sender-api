const TaskDao = require('../dao/TaskDao')
const taskDao = new TaskDao()

class TaskService {
    constructor() { }
    async add(req, res, next) {
        const tmp = await taskDao.save(req.body)
        const result = await taskDao.findById(tmp.id)
        res.send(result)
    }

    async find(req, res, next) {
        const result = await taskDao.findByUsername(req.body.username)
        res.send(result)
    }
}

module.exports = TaskService