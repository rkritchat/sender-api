const CommonRsModel = require('../models/CommonRsModel')

class EmailService {
    constructor() { }

    send(req, res, next) {
        res.send(new CommonRsModel('Email sended Successfully'))
    }
}

module.exports = EmailService