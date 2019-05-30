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

    save(userInfo) {
        const { username, password, firstname, lastname, email } = userInfo
        return new UserModel({ username, password, firstname, lastname, email }).save()
    }

    updateUserInfo(userInfo) {
        const { username, firstname, lastname, email } = userInfo
        return UserModel.updateOne({ username }, { $set: { firstname, lastname, email } })
    }

    updatePwd(userInfo) {
        const { username, password, newPassword } = userInfo
        console.log(password, newPassword);
        return UserModel.updateOne({ username, password }, { $set: { password: newPassword } })
    }

}

module.exports = UserDao