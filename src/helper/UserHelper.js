const _ = require("underscore");
const UserDao = require("../dao/UserDao");
const SdException = require("../common/exception/SdException");
const TaskDao = require("../dao/TaskDao");

class UserHelper {

  constructor() {
    this.userDao = new UserDao();
    this.taskDao = new TaskDao();
  }

  async executeRegister(req, res, next, userInfo) {
    if (!_.isEmpty(userInfo)) {
      next(new SdException("Username already exist."));
    } else {
      res.send(await this.userDao.save(req.body));
    }
  }

  generateResponse(res, custInfo, taskInfo) {
    res.send({ custInfo, taskInfo });
  }

  validateUserInfo(userInfo) {
    if (_.isEmpty(userInfo)) {
      throw new SdException("Username or Password is invalid.");
    }
  }
}

const userHelper = new UserHelper();

module.exports = {
  executeRegister: (req, res, next, userInfo) => userHelper.executeRegister(req, res, next, userInfo),
  generateResponse: (res, custInfo, taskInfo) => userHelper.generateResponse(res, custInfo, taskInfo),
  validateUserInfo: userInfo => userHelper.validateUserInfo(userInfo)
};
