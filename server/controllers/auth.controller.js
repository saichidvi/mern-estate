import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const hassedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hassedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully !",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
