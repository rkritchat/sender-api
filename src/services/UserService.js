const _ = require('underscore')
const UserDao = require('../dao/UserDao')
const TaskDao = require('../dao/TaskDao')
const SdException = require('../common/exception/SdException')
const { registerValidator, loginValidator, updateInfoValidator, updatePwdValidator } = require('../common/validatior/UserValidator')
const CommonRsModel = require('../models/CommonRsModel')

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
      next(new SdException(e.message))
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

  async updateUserInfo(req, res, next) {
    try {
      updateInfoValidator(req.body)
      const result = await this.userDao.updateUserInfo(req.body)
      if (_.isEqual(result.ok, 1)) {
        res.send(new CommonRsModel('Update userInfo Successfully'))
      } else {
        next(new SdException('System error please try again'))
      }
    } catch (e) {
      console.log(e.message);
      next(new SdException(e.message))
    }
  }

  async updatePwd(req, res, next) {
    try {
      updatePwdValidator(req.body)
      const userInfo = await this.userDao.findByUsername(req.body.username)
      this.validatePassword(userInfo, req.body)
      const result = await this.userDao.updatePwd(req.body)
      console.log(result);
      if (_.isEqual(result.ok, 1)) {
        res.send(new CommonRsModel('Update Password Successfully'))
      } else {
        next(new SdException('System error please try again'))
      }
    } catch (e) {
      next(new SdException(e.message))
    }
  }

  validatePassword(userInfo, request) {
    if (!_.isEqual(userInfo.password, request.password)) {
      throw new SdException('Invalid old password')
    }
  }

  validateUsername(userInfo) {
    if (_.isEmpty(userInfo)) {
      throw new SdException('Username or Password is invalid.')
    }
  }

  generateResponse(custInfo, taskInfo) {
    return { custInfo, taskInfo }
  }

}

module.exports = UserService