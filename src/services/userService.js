import { UserModel } from "../models/UserModel"
import { findByUsernameAndPassword } from "../dao/userDao"

const login = async (username, password) => {
  try {
    const rs = await findByUsernameAndPassword(username, password)
    return new UserModel(rs.firstname, rs.lastname)
  } catch (e) {
    throw e
  }
}

module.exports.login = login
