const Joi = require('@hapi/joi')
const SdException = require('../exception/SdException')

class UserValidator {

    constructor() {
        this.initAllSchema()
    }

    initAllSchema() {
        this.initRegisterSchema()
        this.initLoginSchema()
    }

    initRegisterSchema() {
        this.registerSchema = {
            username: Joi.string().min(6).max(25).required(),
            password: Joi.string().min(4).max(25).required(),
            firstname: Joi.string().max(40).required(),
            lastname: Joi.string().max(40).required(),
            email: Joi.string().max(40).email().required()
        }
    }

    initLoginSchema() {
        this.loginSchema = {
            username: Joi.string().min(6).max(25).required(),
            password: Joi.string().min(4).max(25).required()
        }
    }

    validateUserInfoOnRegister(userInfo) {
        const { error } = Joi.validate(userInfo, this.registerSchema)
        this.thowExceptionIfErr(error)
    }

    validateUserInfoOnLogin(userInfo) {
        const { error } = Joi.validate(userInfo, this.loginSchema)
        this.thowExceptionIfErr(error)
    }

    thowExceptionIfErr(error) {
        if (error) {
            const { details } = error
            throw new SdException(details[0].message)
        }
    }

}

const validator = new UserValidator()
module.exports.registerValidator = (userInfo) => validator.validateUserInfoOnRegister(userInfo)
module.exports.loginValidator = (userInfo) => validator.validateUserInfoOnLogin(userInfo)