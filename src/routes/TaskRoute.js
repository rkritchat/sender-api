const express = require('express')
const TaskService = require('../services/TaskService')

class TaskRoute {

    constructor() {
        this.router = express.Router()
        this.initRouter()
    }

    initRouter() {
        const taskService = new TaskService()
        this.router.route('/add').put((req, res, next) => taskService.addTask(req, res, next))
        this.router.route('/find').post((req, res, next) => taskService.find(req, res, next))
    }

    route() {
        return this.router
    }

}

module.exports = TaskRoute