const _ = require('underscore')
const mongoose = require('mongoose')

class UserDao {

    constructor() {
        this.schema = mongoose.Schema({
            username: String,
            password: String,
            firstname: String,
            lastname: String,
            email: String
        })
        this.UserInfo = new mongoose.model('userInfo', this.schema, 'userInfo')
    }

    findByUsernameAndPassword(username, password) {
        return this.UserInfo.find({ username, password }).limit(1)
    }

    findByUsername(username) {
        return this.UserInfo.find({ username })
    }

    save(body) {
        const { username, password, firstname, lastname, email } = body
        const userDao = new this.UserInfo({ username, password, firstname, lastname, email })
        return userDao.save()
    }
}

module.exports = UserDao