const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const UserRoute = require('./routes/UserRoute')
const TaskRoute = require('./routes/TaskRoute')

class App {

  constructor() {
    this.app = express()
    this.initConfig()
    this.initRoute()
    this.connectDb()
    this.handle404()
    this.handleException()
  }

  initConfig() {
    dotenv.config()
  }

  initRoute() {
    this.app.use(express.json())
    this.app.use("/user", new UserRoute().route())
    this.app.use("/task", new TaskRoute().route())
    this.app.use(morgan('tiny'))
  }

  handle404() {
    this.app.use((req, res, next) => {
      const err = new Error('Not found ')
      err.status = 404
      next(err)
    })
  }

  handleException() {
    this.app.use((err, req, res, next) => {
      const error = this.app.get('env') === 'development' ? err : {}
      const status = err.status || 500

      res.status(status).json({
        error: {
          message: error.message
        }
      })
    })
  }

  connectDb() {
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
  }

  start() {
    const port = process.env.PORT
    this.app.listen(port, () => {
      console.log("Listening on port", port);
    });
  }
}

const app = new App()
app.start()