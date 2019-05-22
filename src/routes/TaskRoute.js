const express = require('express')
const TaskService = require('../services/TaskService')

class TaskRoute {

    constructor() {
        const taskService = new TaskService()
        this.router = express.Router()
        this.router.route('/add').put(taskService.add)
        this.router.route('/find').post(taskService.find)
    }

    route() {
        return this.router
    }

}

module.exports = TaskRoute