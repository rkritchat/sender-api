import express from "express"
import userService from "../services/userService"

const router = express.Router()

router.route("/login").post(userService.login)
router.route("/regirster").post(userService.register)
router.route("/modify").post(userService.modify)

export default router
