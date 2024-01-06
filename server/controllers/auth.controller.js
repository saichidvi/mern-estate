import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hassedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hassedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully !",
    });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(401, "User not found , please register."));
    }
    const validPasswod = bcryptjs.compareSync(password, validUser.password);
    if (!validPasswod) {
      next(errorHandler(401, "Invalid Password."));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...userInfo } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json(userInfo);
  } catch (err) {
    next(err);
  }
};
