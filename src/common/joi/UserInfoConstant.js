const Joi = require('@hapi/joi')

class UserInfoConstant {

    constructor() { }

    username() {
        return Joi.string().min(6).max(25).required()
    }

    password() {
        return Joi.string().min(4).max(25).required()
    }

    firstname() {
        return Joi.string().max(40).required()
    }

    lastname() {
        return Joi.string().max(40).required()
    }

    email() {
        return Joi.string().max(40).email().required()
    }
}

const cons = new UserInfoConstant()
module.exports.username = cons.username()
module.exports.password = cons.password()
module.exports.firstname = cons.firstname()
module.exports.lastname = cons.lastname()
module.exports.email = cons.email()