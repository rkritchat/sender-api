const Joi = require('@hapi/joi')
const Validator = require('./Validator')
const { username, password, firstname, lastname, email, newPassword } = require('../joi/UserInfoConstant')


class UserValidator extends Validator {

    constructor() {
        super()
        this.initAllSchema()
    }

    initAllSchema() {
        this.initRegisterSchema()
        this.initLoginSchema()
        this.initUpdateInfoSchema()
        this.initUpdatePwdSchema()
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

    initUpdateInfoSchema() {
        this.updateInfoSchema = {
            username, firstname, lastname, email
        }
    }

    initUpdatePwdSchema() {
        this.updatePwdSchema = {
            username, password, newPassword
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

    validateUserInfoOnUpdateInfo(userInfo) {
        const { error } = Joi.validate(userInfo, this.updateInfoSchema)
        this.thowExceptionIfErr(error)
    }

    validateUserInfoOnUpdatePwd(userInfo) {
        const { error } = Joi.validate(userInfo, this.updatePwdSchema)
        this.thowExceptionIfErr(error)
    }

}

const validator = new UserValidator()

module.exports = {
    registerValidator: (userInfo) => validator.validateUserInfoOnRegister(userInfo),
    loginValidator: (userInfo) => validator.validateUserInfoOnLogin(userInfo),
    updateInfoValidator: (userInfo) => validator.validateUserInfoOnUpdateInfo(userInfo),
    updatePwdValidator: (userInfo) => validator.validateUserInfoOnUpdatePwd(userInfo)
}