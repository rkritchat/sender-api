const Joi = require('@hapi/joi')
const Validator = require('./Validator')
const { username, password, firstname, lastname, email } = require('../joi/UserInfoConstant')


class UserValidator extends Validator {

    constructor() {
        super()
        this.initAllSchema()
    }

    initAllSchema() {
        this.initRegisterSchema()
        this.initLoginSchema()
    }

    initRegisterSchema() {
        this.registerSchema = {
            username, password, firstname, lastname, email
        }
    }

    initLoginSchema() {
        this.loginSchema = {
            username, password
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

}

const validator = new UserValidator()

module.exports = {
    registerValidator: (userInfo) => validator.validateUserInfoOnRegister(userInfo),
    loginValidator: (userInfo) => validator.validateUserInfoOnLogin(userInfo)
}