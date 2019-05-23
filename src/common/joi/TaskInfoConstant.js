const Joi = require('@hapi/joi')

class TaskInfoConstant {
    constructor() {
    }

    task() {
        return Joi.object().keys({
            taskName: Joi.string().max(70).required(),
            taskDesc: Joi.string().max(1000).required(),
            taskProgress: Joi.string().max(3).required()
        }).required()
    }
}

const cons = new TaskInfoConstant()
module.exports.task = cons.task()
