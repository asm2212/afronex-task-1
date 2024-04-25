import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { isEmail } from "validator";
import dotenv from "dotenv";

dotenv.config();

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
    },
    firstname: {
      type: String,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters long"],
    },
    profileImg: {
      public_id: {
        type: String,
        default: "qo4bnnmunbtain0qxinx",
      },
      url: {
        type: String,
        default: process.env.USER_IMAGE || "default_image_url",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
