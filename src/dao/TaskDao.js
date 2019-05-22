const _ = require('underscore')
const mongoose = require('mongoose')

// const taskInfo = [
//     {
//         username: 'rkrtichat', task: [
//             { taskName: 'CGP', taskDesc: 'Clean code', taskProgress: '40' },
//             { taskName: 'direcApprove', taskDesc: 'Create unit test for approve serice', taskProgress: '10' },
//             { taskName: 'eCustom', taskDesc: 'Create e-service', taskProgress: '100' },
//         ]
//     }, {
//         username: 'admin', task: [
//             { taskName: 'aa', taskDesc: 'Test des of task aa', taskProgress: '10' },
//             { taskName: 'bb', taskDesc: 'lorem', taskProgress: '5' }
//         ]
//     }
// ]



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