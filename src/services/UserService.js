const _ = require('underscore')
const UserDao = require('../dao/UserDao')
const UserModel = require('../models/UserModel')
const userDao = new UserDao()

module.exports = {

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body
      // const [user, task] = await Promise.all([findByUsernameAndPassword(username, password), findByUsername(username)])
      const user = await userDao.findByUsernameAndPassword(username, password)
      const userInfo = new UserModel(user[0])
      // const taskInfo = new TaskModel(task)
      res.send(userInfo) //, taskInfo
    } catch (e) {
      console.log(e);
      res.status(400).send(e)
    }
  },

  register: async (req, res, next) => {
    const user = await userDao.findByUsername(req.body.username)
    if (!_.isEmpty(user)) {
      next(new Error('Username already exist'))
    } else {
      const result = await userDao.save(req.body)
      res.send('Register Successfully')
    }
  },

  modify: async (req, res, next) => {

  }

}

