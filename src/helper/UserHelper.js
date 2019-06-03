const _ = require("underscore");
const UserDao = require("../dao/UserDao");
const SdException = require("../common/exception/SdException");
const TaskDao = require("../dao/TaskDao");

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

  async findByUsernameAndPassword(body) {
    const { username, password } = body
    const [userInfo, taskInfo] = await Promise.all([this.userDao.findByUsernameAndPassword(username, password), this.taskDao.findByUsername(username)])
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
}

const userHelper = new UserHelper();

module.exports = {
  validateUserByUseranme: body => userHelper.validateUserByUseranme(body),
  createUser: (body) => userHelper.createUser(body),
  updateUserInfo: body => userHelper.updateUserInfo(body),
  findByUsernameAndPassword: body => userHelper.findByUsernameAndPassword(body),
  validateOldPassword: body => userHelper.validateOldPassword(body),
  updatePasssword: body => userHelper.updatePasssword(body)
};
