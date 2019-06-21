const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const https = require('https')
const fs = require('fs')

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
    this.app.use("/user", require('./routes/UserRoute'))
    this.app.use("/task", require('./routes/TaskRoute'))
    this.app.use("/email", require('./routes/EmailRoute'))
    this.app.use(morgan('tiny'))
    this.app.get('/testt', (req, res) => {
      res.send('Hello world')
    })
  }

  handle404() {
    this.app.use((req, res, next) => {
      const err = new Error('Not found')
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

  getApp() {
    return this.app
  }

}

https.createServer({
  key: fs.readFileSync(__dirname + '/resource/server.key'),
  cert: fs.readFileSync(__dirname + '/resource/server.cert')
}, new App().getApp()).listen(3400, () => {
  console.log('listening on port 34000');
})