import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import user from "./routes/user";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
  .then(() => console.debug('connected db'))
  .catch((e) => console.log('Could not connect db', e))

app.use(express.json())
app.use("/user", user);
app.use(morgan('tiny'))

//Add error when enpoint not found
app.use((req, res, next) => {
  const err = new Error('Not found ')
  err.status = 404
  next(err)
})

//init response json
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500

  res.status(status).json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => {
  console.log("Listening on port", port);
});
