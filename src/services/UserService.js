const _ = require('underscore')
const { validateUserByUseranme, createUser, updateUserInfo, findUserInfoAndTask, validateOldPassword, updatePasssword } = require('../helper/UserHelper')
const { registerValidator, loginValidator, updateInfoValidator, updatePwdValidator } = require('../common/validatior/UserValidator')
const SdException = require('../common/exception/SdException')
const CommonRsModel = require('../models/CommonRsModel')
const bcrypt = require('bcryptjs')

class UserService {

  constructor() {
  }

  async login(req, res, next) {
    try {
      loginValidator(req.body)
      const result = await findUserInfoAndTask(req.body)
      const isMatch = await this.validatePassword(result.userInfo, req.body)
      if (!isMatch) throw new SdException('Invalid Credentials')
      res.send(result)
    } catch (e) {
      next(new SdException(e.message))
    }
  }

  async register(req, res, next) {
    try {
      const body = req.body
      registerValidator(body)
      await validateUserByUseranme(body)
      body.password = await this.hashPassword(body)
      res.send(await createUser(body))
    } catch (e) {
      next(new SdException(e.message))
    }
  }

  async updateUserInfo(req, res, next) {
    try {
      const body = req.body
      updateInfoValidator(body)
      await updateUserInfo(body)
      res.send(new CommonRsModel('Update userInfo Successfully'))
    } catch (e) {
      next(new SdException(e.message))
    }
  }

  async updatePwd(req, res, next) {
    try {
      updatePwdValidator(req.body)
      await validateOldPassword(req.body)
      await updatePasssword(req.body)
      res.send(new CommonRsModel('Update Password Successfully'))
    } catch (e) {
      next(new SdException(e.message))
    }
  }

  async hashPassword(body) {
    const { password } = body
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  async validatePassword(userInfo, body) {
    const { password } = userInfo
    return await bcrypt.compare(body.password, password)
  }
}

module.exports = UserService