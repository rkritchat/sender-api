const mongoose = require('mongoose')

class TaskModel {

    constructor() {
        this.schema = mongoose.Schema({
            username: String,
            task: {
                taskName: String,
                taskDesc: String,
                taskProgress: String,
                taskCreateDate: { type: Date, default: Date.now }
            }
        })
    }
}



module.exports = mongoose.model('taskInfo', new TaskModel().schema, 'taskInfo')