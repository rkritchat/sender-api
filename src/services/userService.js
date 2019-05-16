import { findByUsername } from "../dao/taskDao"
import { findByUsernameAndPassword } from "../dao/userDao"
import { TaskModel } from "../models/TaskModel"
import { UserModel } from "../models/UserModel"

module.exports = {

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body
      const [user, task] = await Promise.all([findByUsernameAndPassword(username, password), findByUsername(username)])
      const userInfo = new UserModel(user)
      const taskInfo = new TaskModel(task)
      res.send({ userInfo, taskInfo })
    } catch (e) {
      res.status(400).send(e)
    }
  },

  register: async (req, res, next) => {
    try {

    } catch (e) {

    }
  },

  modify: async (req, res, next) => {
    try {

    } catch (e) {

    }
  }
}