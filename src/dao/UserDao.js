const _ = require('underscore')
const { UserModel } = require('../models/UserModel')

class UserDao {

    constructor() { }

    findByUsernameAndPassword(username, password) {
        return UserModel.findOne({ username, password })
    }

    findByUsername(username) {
        return UserModel.findOne({ username })
    }

    save(body) {
        const { username, password, firstname, lastname, email } = body
        return new UserModel({ username, password, firstname, lastname, email }).save()
    }

}

module.exports = UserDao