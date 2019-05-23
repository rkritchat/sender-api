const _ = require('underscore')
const UserDao = require('../dao/UserDao')
const TaskDao = require('../dao/TaskDao')
const userDao = new UserDao()
const taskDao = new TaskDao()

class UserService {

  constructor() { }
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const [user, task] = await Promise.all([userDao.findByUsernameAndPassword(username, password), taskDao.findByUsername(username)])
      res.send({ user: user[0], task })
    } catch (e) {
      console.log(e);
      res.status(400).send(e)
    }
  }

  async register(req, res, next) {
    const user = await userDao.findByUsername(req.body.username)
    if (!_.isEmpty(user)) {
      next(new Error('Username already exist'))
    } else {
      const result = await userDao.save(req.body)
      res.send('Register Successfully')
    }
  }

  async modify(req, res, next) {

  }
}

module.exports = UserService