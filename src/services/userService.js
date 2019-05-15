import { UserModel } from "../models/UserModel"
import { findByUsernameAndPassword } from "../dao/userDao"

module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body
      const result = await findByUsernameAndPassword(username, password)
      console.log(result);
      res.send(result)
    } catch (e) {
      errorResult(res, e)
    }
  }
}

const errorResult = (res, e) => {
  res.status(400).send(e)
}