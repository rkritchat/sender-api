const mongoose = require('mongoose')

class UserModel {

  constructor() {
    this.schema = mongoose.Schema({
      username: String,
      password: String,
      firstname: String,
      lastname: String,
      email: String
    })
  }

}

module.exports = mongoose.model('userInfo', new UserModel().schema, 'userInfo')