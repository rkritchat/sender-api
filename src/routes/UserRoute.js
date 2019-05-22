const express = require('express')
const userService = require('../services/UserService')

class UserRoute {
    constructor() {
        this.router = express.Router()
        this.router.route("/login").post(userService.login)
        this.router.route("/register").post(userService.register)
        this.router.route("/modify").post(userService.modify)
    }

    route() {
        return this.router
    }
}

module.exports = UserRoute