const _ = require("underscore");
const UserDao = require("../dao/UserDao");
const SdException = require("../common/exception/SdException");
const TaskDao = require("../dao/TaskDao");
const bcrypt = require('bcryptjs')

class UserHelper {

  constructor() {
    this.userDao = new UserDao();
    this.taskDao = new TaskDao();
  }

  async createUser(body) {
    return this.userDao.save(body);
  }

  async validateUserByUseranme(body) {
    const result = await this.userDao.findByUsername(body.username)
    if (result) throw new SdException("Username is already exist");
  }

  async updateUserInfo(body) {
    const result = await this.userDao.updateUserInfo(body)
    if (result && !_.isEqual(result.n, 1)) {
      throw new SdException('Databases Exception')
    }
  }

  async findUserInfoAndTask(body) {
    const { username } = body
    const [userInfo, taskInfo] = await Promise.all([this.userDao.findByUsername(username), this.taskDao.findByUsername(username)])
    if (_.isEmpty(userInfo)) {
      throw new SdException('Username or Password is invalid.')
    }
    return { userInfo, taskInfo }
  }

  async validateOldPassword(body) {
    const { username, password, newPassword } = body
    const userInfo = await this.userDao.findByUsername(username)
    if (!_.isEqual(userInfo.password, password)) {
      throw new SdException('Invalid old password')
    }
  }

  async updatePasssword(body) {
    const result = await this.userDao.updatePwd(body)
    if (result && !_.isEqual(result.n, 1)) {
      throw new SdException('Databases Exception')
    }
  }

  async hashPassword(body) {
    const { password } = body
    const salt = await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(password, salt)
  }

  async validatePassword(userInfo, body) {
    const { password } = userInfo
    const isMatch = await bcrypt.compare(body.password, password)
    if (!isMatch) throw new SdException('Invalid Credentials')
  }
}

const userHelper = new UserHelper();

module.exports = {
  validateUserByUseranme: body => userHelper.validateUserByUseranme(body),
  createUser: (body) => userHelper.createUser(body),
  updateUserInfo: body => userHelper.updateUserInfo(body),
  findUserInfoAndTask: body => userHelper.findUserInfoAndTask(body),
  validateOldPassword: body => userHelper.validateOldPassword(body),
  updatePasssword: body => userHelper.updatePasssword(body),
  hashPassword: (body) => userHelper.hashPassword(body),
  validatePassword: (userInfo, body) => userHelper.validatePassword(userInfo, body)
};
