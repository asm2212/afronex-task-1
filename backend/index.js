import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/Routes.js";
import { verifyUser } from "./middleware/auth.js";


dotenv.config();


const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./uploads"));


app.use(router);


app.get("/", verifyUser, (req, res) => {
  const username = res.locals.username;
  const response = {
    message: "Welcome to Afronex Blog!",
    isLogedin: !!username,
  };
  if (username) {
    response.username = username;
  }
  res.status(200).json(response);
});


const PORT = process.env.PORT || 4000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to the database successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
connectDB();
