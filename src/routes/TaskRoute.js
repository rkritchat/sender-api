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
        this.router.route('/find').post((req, res, next) => taskService.findTask(req, res, next))
        this.router.route('/delete').delete((req, res, next) => taskService.deleteTask(req, res, next))
    }

    route() {
        return this.router
    }

}

const taskRoute = new TaskRoute()
module.exports.taskRoute = taskRoute.route()