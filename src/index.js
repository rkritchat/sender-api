const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const UserRoute = require('./routes/UserRoute')
const TaskRoute = require('./routes/TaskRoute')

// import user from "./routes/user";
// import task from "./routes/task";
// import "dotenv/config";
class Index {
  constructor() {
    this.userRoute = new UserRoute()
    this.taskRoute = new TaskRoute()

    this.app = express()
    this.port = 3400 //process.env.PORT;
    this.app.use(express.json())
    this.app.use("/user", this.userRoute.route())
    this.app.use("/task", this.taskRoute.route())
    this.app.use(morgan('tiny'))
    mongoose.connect('mongodb://172.17.0.2:27017/sender', { useNewUrlParser: true })
    //process.env.DATABASE_URI
    this.app.use((req, res, next) => {
      const err = new Error('Not found ')
      err.status = 404
      next(err)
    })

    //init response json
    this.app.use((err, req, res, next) => {
      const error = this.app.get('env') === 'development' ? err : {}
      const status = err.status || 500

      res.status(status).json({
        error: {
          message: error.message
        }
      })
    })

    this.app.listen(this.port, () => {
      console.log("Listening on port", this.port);
    });

  }
}

const index = new Index()