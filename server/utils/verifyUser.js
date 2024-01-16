import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "User is not authorised."));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(403, "Forbidden");
    }
    req.user = user;
    next();
  });
  try {
  } catch (err) {
    next(err);
  }
};
