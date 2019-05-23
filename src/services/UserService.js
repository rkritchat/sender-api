const _ = require('underscore')
const UserDao = require('../dao/UserDao')
const TaskDao = require('../dao/TaskDao')
const SdException = require('../common/exception/SdException')
const { registerValidator, loginValidator } = require('../common/validation/UserValidator')

class UserService {

  constructor() {
    this.userDao = new UserDao()
    this.taskDao = new TaskDao()
  }

  async login(req, res, next) {
    try {
      loginValidator(req.body)
      const { username, password } = req.body
      const [userInfo, taskInfo] = await Promise.all([this.userDao.findByUsernameAndPassword(username, password), this.taskDao.findByUsername(username)])
      this.validateUsername(userInfo)
      res.send(this.generateResponse(userInfo, taskInfo))
    } catch (e) {
      next(e)
    }
  }

  async register(req, res, next) {
    try {
      registerValidator(req.body)
      const userInfo = await this.userDao.findByUsername(req.body.username)
      if (!_.isEmpty(userInfo)) {
        next(new SdException('Username already exist.'))
      } else {
        res.send(await this.userDao.save(req.body))
      }
    } catch (e) {
      next(new SdException(e.message))
    }
  }

  async modify(req, res, next) {

  }

  validateUsername(userInfo) {
    if (_.isEmpty(userInfo)) {
      throw new SdException('Username or Password is invalid.')
    }
  }

  generateResponse(custInfo, taskInfo) {
    return { custInfo: custInfo[0], taskInfo }
  }
}

module.exports = UserService