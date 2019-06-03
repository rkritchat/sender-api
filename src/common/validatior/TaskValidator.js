const Joi = require('@hapi/joi')
const Validator = require('./Validator')
const { username } = require('../joi/UserInfoConstant')
const { task, _id } = require('../joi/TaskInfoConstant')

class TaskValidator extends Validator {

    constructor() {
        super()
        this.initAllSchema()
    }

    initAllSchema() {
        this.initAddTaskSchema()
        this.initFindTaskSchema()
        this.initDeleteTaskSchema()
    }

    initAddTaskSchema() {
        this.addTaskSchema = {
            username, task
        }
    }

    initFindTaskSchema() {
        this.findTaskSchema = {
            username
        }
    }

    initDeleteTaskSchema() {
        this.deleteTaskSchema = {
            username, _id
        }
    }

    validateTaskInfoOnAddTask(taskInfo) {
        const { error } = Joi.validate(taskInfo, this.addTaskSchema)
        this.thowExceptionIfErr(error)
    }

    validateTaskInfoOnFindTask(taskInfo) {
        const { error } = Joi.validate(taskInfo, this.findTaskSchema)
        this.thowExceptionIfErr(error)
    }

    validateTaskInfoOnDeleteTask(taskInfo) {
        const { error } = Joi.validate(taskInfo, this.deleteTaskSchema)
        this.thowExceptionIfErr(error)
    }

}

const validator = new TaskValidator()

module.exports = {
    addTaskValidator: (taskInfo) => validator.validateTaskInfoOnAddTask(taskInfo),
    findTaskValidator: (taskInfo) => validator.validateTaskInfoOnFindTask(taskInfo),
    deleteTaskValidator: (taskInfo) => validator.validateTaskInfoOnDeleteTask(taskInfo)
}


