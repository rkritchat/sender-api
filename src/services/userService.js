import { UserModel } from "../models/UserModel"
import { findByUsernameAndPassword } from "../dao/userDao"

const login = async (username, password) => {
  const rs = await findByUsernameAndPassword(username, password)
  return new UserModel(rs.firstname, rs.lastname)
}

module.exports.login = login
