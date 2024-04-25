import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const handleErrors = (err) => {
  console.log(err.code, err.message);
  if (err.message.includes("incorrect password")) {
    return { message: "Minimum password length is 4 characters" };
  }
  if (err.code === 11000) {
    return { message: "Email or username is already registered" };
  }
  if (err.message.includes("is required")) {
    return { message: "Please fill up all fields." };
  }
  if (err.message.includes("user validation failed")) {
    return { message: "Email is invalid" };
  }
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.ACCESS_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

export const registerController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const username = email.split("@")[0];
  try {
    await userModel.create({
      username,
      firstname,
      lastname,
      email,
      password,
      bio: `Hey, I'm ${firstname}`,
    });
    res.status(201).json({
      message: "User has been created successfully",
    });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = createToken(user._id, user.username);
      return res.status(200).json({
        user: { _id: user._id, username: user.username },
        authToken: token,
        message: "Login successful!",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = handleValidationErrors(err);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
