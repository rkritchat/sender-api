const _ = require('underscore')
const TaskDao = require('../dao/TaskDao')
const SdException = require('../common/exception/SdException')


class TaskHelper {

    constructor() {
        this.taskDao = new TaskDao()
    }

    async validateTaskByTaskIdAndUseranme(body) {
        const { _id, username } = body
        let result = null
        try {
            result = await this.taskDao.findByIdAndUsername(_id, username)
        } catch (e) {
            console.log(e);
            throw new SdException('Ivalid task Id')
        }
        if (!result) throw new SdException('Invalid TaskId or Username')
    }

    async deleteTask(body) {
        const result = await this.taskDao.delete(body)
        if (result && !_.isEqual(result.n, 1)) {
            throw new SdException('Databases Exception')
        }
    }

    async findTaskByUsername(body) {
        return this.taskDao.findByUsername(body.username)
    }

    async saveTask(body) {
        return this.taskDao.save(body)
    }

    async findTaskById(id) {
        return this.taskDao.findById(id)
    }
}

const taskHelper = new TaskHelper()

module.exports = {
    validateTaskIdAndUsername: (body) => taskHelper.validateTaskByTaskIdAndUseranme(body),
    deleteTask: (body) => taskHelper.deleteTask(body),
    findTaskByUsername: (body) => taskHelper.findTaskByUsername(body),
    saveTask: (body) => taskHelper.saveTask(body),
    findTaskById: (id) => taskHelper.findTaskById(id)
}