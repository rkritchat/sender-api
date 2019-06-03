const Joi = require('@hapi/joi')

class TaskInfoConstant {

    constructor() { }

    task() {
        return Joi.object().keys({
            taskName: Joi.string().max(70).required(),
            taskDesc: Joi.string().max(1000).required(),
            taskProgress: Joi.number().integer().min(0).max(100).required()
        }).required()
    }

    taskName() {
        return Joi.string().max(70).required()
    }

    taskId() {
        return Joi.string().required()
    }

}

const cons = new TaskInfoConstant()

module.exports = {
    task: cons.task(),
    taskName: cons.taskName(),
    _id: cons.taskId()
}
