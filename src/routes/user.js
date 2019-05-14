import express from "express"
import userService from "../services/userService"
import { UserModel } from "../models/UserModel"

const route = express()

route.post("/login", (req, res) => {
  const { username, password } = req.body
  const result = userService.login(username, password)
  if (result === Error) {
    res.status(400).send(resutl.toString())
  } else {
    res.send(new UserModel('a', 'b'))
  }
});

export default route
