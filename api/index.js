import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
});

app.use(express.json());

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
