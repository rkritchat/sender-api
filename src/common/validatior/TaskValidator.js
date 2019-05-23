const Joi = require('@hapi/joi')
const Validator = require('./Validator')
const { username } = require('../joi/UserInfoConstant')
const { task } = require('../joi/TaskInfoConstant')

class TaskValidator extends Validator {

    constructor() {
        super()
        this.initAllSchema()
    }

    initAllSchema() {
        this.initAddTaskSchema()
        this.initFindTaskSchema()
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

    validateTaskInfoOnAddTask(taskInfo) {
        const { error } = Joi.validate(taskInfo, this.addTaskSchema)
        this.thowExceptionIfErr(error)
    }

    validateTaskInfoOnFindTask(taskInfo) {
        const { error } = Joi.validate(taskInfo, this.findTaskSchema)
        this.thowExceptionIfErr(error)
    }

}

const validator = new TaskValidator()
module.exports.addTaskValidator = (taskInfo) => validator.validateTaskInfoOnAddTask(taskInfo)
module.exports.findTaskValidator = (taskInfo) => validator.validateTaskInfoOnFindTask(taskInfo)




