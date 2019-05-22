const express = require('express')
const TaskService = require('../services/TaskService')

class TaskRoute {

    constructor() {
        this.router = express.Router()
        this.initRouter()
    }

    initRouter() {
        const taskService = new TaskService()
        this.router.route('/add').put(taskService.add)
        this.router.route('/find').post(taskService.find)
    }

    route() {
        return this.router
    }

}

module.exports = TaskRoute