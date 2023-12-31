import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileUploadRouter from "./routes/fileUpload.route.js";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
});

app.use(express.json());

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Use the upload route
app.use("/api/upload", fileUploadRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
