const express = require('express')
const EmailService = require('../services/EmailService')

class EmailRoute {

    constructor() {
        this.router = express.Router()
        this.initRouter()
    }

    initRouter() {
        const emailService = new EmailService()
        this.router.route('/send').post((req, res, next) => emailService.send(req, res, next))
    }

    getRoute() {
        return this.router
    }
}

const emailRoute = new EmailRoute()
module.exports.emailRoute = emailRoute.getRoute()