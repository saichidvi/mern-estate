import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  const hassedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hassedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully !",
    });
  } catch (err) {
    next(err);
    return;
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(401, "User not found , please register."));
      return;
    }
    const validPasswod = bcryptjs.compareSync(password, validUser.password);
    if (!validPasswod) {
      next(errorHandler(401, "Invalid Password."));
      return;
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...userInfo } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json(userInfo);
  } catch (err) {
    next(err);
    return;
  }
};

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie("acess_token", token, { httpOnly: true });
      res.status(200).json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hassedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: email,
        password: hassedPassword,
        avatar: photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie("access_token", token, { httpOnly: true });
      res.status(200).json(rest);
    }
  } catch (err) {
    next(err);
    return;
  }
};
