import express from "express";
import user from "./routes/user";
import "dotenv/config";

const app = express();
app.use(express.json())
const port = process.env.PORT;
app.use("/user", user);

app.listen(port, () => {
  console.log("Listening on port", port);
});
