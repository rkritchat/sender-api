const _ = require('underscore')
const mongoose = require('mongoose')
const UserSchema = require('../models/UserModel')

class UserDao {

    constructor() {
    }

    findByUsernameAndPassword(username, password) {
        return UserSchema.find({ username, password }).limit(1)
    }

    findByUsername(username) {
        return UserSchema.find({ username })
    }

    save(body) {
        const { username, password, firstname, lastname, email } = body
        return new UserSchema({ username, password, firstname, lastname, email }).save()
    }
}

module.exports = UserDao