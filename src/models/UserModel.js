class UserModel {

  constructor(userInfo) {
    this.firstname = userInfo.firstname
    this.lastname = userInfo.lastname
    this.email = userInfo.email
  }

}

module.exports = UserModel