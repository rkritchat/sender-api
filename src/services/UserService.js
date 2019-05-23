const _ = require('underscore')
const UserDao = require('../dao/UserDao')
const TaskDao = require('../dao/TaskDao')
const SdException = require('../common/exception/SdException')

class UserService {

  constructor() {
    this.userDao = new UserDao()
    this.taskDao = new TaskDao()
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const [userInfo, taskInfo] = await Promise.all([this.userDao.findByUsernameAndPassword(username, password), this.taskDao.findByUsername(username)])
      this.validateUsername(userInfo)
      res.send(this.generateResponse(userInfo, taskInfo))
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async register(req, res, next) {
    const userInfo = await this.userDao.findByUsername(req.body.username)
    if (!_.isEmpty(userInfo)) {
      next(new SdException('Username already exist'))
    } else {
      res.send(await this.userDao.save(req.body))
    }
  }

  async modify(req, res, next) {

  }

  validateUsername(userInfo) {
    if (_.isEmpty(userInfo)) {
      throw new SdException('Username or Password is invalid')
    }
  }

  generateResponse(custInfo, taskInfo) {
    return { custInfo: custInfo[0], taskInfo }
  }
}

module.exports = UserService