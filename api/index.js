import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUploadRoutes from "./routes/fileUpload.route.js";
import fileGetRoutes from "./routes/fileGet.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
});

app.use("/api", fileUploadRoutes);
app.use("/api", fileGetRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
