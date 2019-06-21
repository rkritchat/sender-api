const _ = require('underscore')
const { validateUserByUseranme, createUser, updateUserInfo, findUserInfoAndTask, validateOldPassword, updatePasssword, hashPassword, validatePassword } = require('../helper/UserHelper')
const { registerValidator, loginValidator, updateInfoValidator, updatePwdValidator } = require('../common/validatior/UserValidator')
const SdException = require('../common/exception/SdException')
const CommonRsModel = require('../models/CommonRsModel')

class UserService {

  constructor() {
  }

  async login(req, res, next) {
    try {
      loginValidator(req.body)
      const result = await findUserInfoAndTask(req.body)
      await validatePassword(result.userInfo, req.body)
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
      await hashPassword(body)
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

}

module.exports = UserService