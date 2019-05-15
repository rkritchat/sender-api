import express from "express"
import userService from "../services/userService"

const router = express.Router()

router.route("/login").post(userService.login)

export default router
