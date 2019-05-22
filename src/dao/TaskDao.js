const _ = require('underscore')
const mongoose = require('mongoose')

class TaskDao {
    constructor() {
        this.schema = mongoose.Schema({
            username: String,
            task: { taskName: String, taskDesc: String, taskProgress: String, taskCreateDate: { type: Date, default: Date.now } }
        })
        this.TaskInfo = new mongoose.model('taskInfo', this.schema, 'taskInfo')
    }

    findByUsername(username) {
        return this.TaskInfo.find({ username })
    }

    findById(id) {
        return this.TaskInfo.find({ "_id": id })
    }

    save(body) {
        const { username, task } = body
        const taskDao = new this.TaskInfo({ username, task })
        return taskDao.save()
    }
}

module.exports = TaskDao