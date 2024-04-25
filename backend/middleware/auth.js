import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new Error("No token provided.");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    const user = await userModel.findById(decodedToken.id);

    if (!user) {
      throw new Error("User not found.");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    res.locals.user = null;
    return res.status(401).json({
      message: error.message || "User is not authenticated.",
    });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.locals.username = null;
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    res.locals.username = decodedToken.username;
    next();
  } catch (error) {
    res.locals.username = null;
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
