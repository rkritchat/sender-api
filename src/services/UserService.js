const UserDao = require('../dao/UserDao')
const UserModel = require('../models/UserModel')
const userDao = new UserDao()

module.exports = {

  // constructor() {
  //   this.userDao = new UserDao()
  // }

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body
      // const [user, task] = await Promise.all([findByUsernameAndPassword(username, password), findByUsername(username)])
      const user = await userDao.findByUsernameAndPassword(username, password)
      console.log(user);
      const userInfo = new UserModel(user[0])
      // const taskInfo = new TaskModel(task)
      res.send(userInfo) //, taskInfo
    } catch (e) {
      console.log(e);
      res.status(400).send(e)
    }
  },

  register: async (req, res, next) => {
    const result = await userDao.save(req.body)
    console.log(result)
    res.send('Register Successfully')
  },

  modify: async (req, res, next) => {

  }

}
