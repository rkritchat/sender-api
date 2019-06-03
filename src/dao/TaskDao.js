const _ = require('underscore')
const { TaskModel } = require('../models/TaskModel')

class TaskDao {

    constructor() { }

    findByUsername(username) {
        return TaskModel.find({ username })
    }

    findById(_id) {
        return TaskModel.findOne({ _id })
    }

    save(body) {
        const { username, task } = body
        return new TaskModel({ username, task }).save()
    }

    delete(body) {
        const { username, _id } = body
        return TaskModel.deleteOne({ username, _id })
    }

    findByIdAndUsername(_id, username) {
        return TaskModel.findOne({ _id, username })
    }

}

module.exports = TaskDao