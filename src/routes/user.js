import express from "express"
import userService from "../services/userService"
import { findByUsernameAndPassword } from "../dao/userDao"

const route = express()

route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await findByUsernameAndPassword(username, password)
    res.send(result)
  } catch (e) {
    errorResult(res, e)
  }
});

const errorResult = (res, e) => {
  res.status(400).send(e)
}

export default route
