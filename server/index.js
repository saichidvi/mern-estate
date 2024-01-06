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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Errror";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is listening on the port no 3000!!!");
});
