import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
const app = express();
dotenv.config();

app.use(express.json());
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Data base connected.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);
app.get("/test", (req, res) => {
  res.send("Hey , you are on the server.");
});

app.listen(3000, () => {
  console.log("Server is listening on the port no 3000!!!");
});
