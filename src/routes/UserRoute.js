const express = require('express')
const UserService = require('../services/UserService')

class UserRoute {

    constructor() {
        this.router = express.Router()
        this.initRouter()
    }

    initRouter() {
        const userService = new UserService()
        this.router.route("/login").post((req, res, next) => userService.login(req, res, next))
        this.router.route("/register").post((req, res, next) => userService.register(req, res, next))
        this.router.route("/modify").post((req, res, next) => userService.modify(req, res, next))
    }

    route() {
        return this.router
    }
}

module.exports = UserRoute