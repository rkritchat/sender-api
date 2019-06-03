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
        console.log(result);
        if (result && !_.isEqual(result.n, 1)) {
            throw new SdException('Databases Exception')
        }
    }
}

const taskHelper = new TaskHelper()

module.exports = {
    validateTaskIdAndUsername: (body) => taskHelper.validateTaskByTaskIdAndUseranme(body),
    deleteTask: (body) => taskHelper.deleteTask(body)
}