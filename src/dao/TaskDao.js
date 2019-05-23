const _ = require('underscore')
const { TaskModel } = require('../models/TaskModel')

class TaskDao {

    constructor() { }

    findByUsername(username) {
        return TaskModel.find({ username })
    }

    findById(id) {
        return TaskModel.find({ "_id": id })
    }

    save(body) {
        const { username, task } = body
        return new TaskModel({ username, task }).save()
    }

}

module.exports = TaskDao