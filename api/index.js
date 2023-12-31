import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
});

const app = express();

app.use(express.static("public"));

app.get("/public/awaqi.pdf", (req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="awaqi.pdf"');
  res.sendFile(path.join(__dirname, "public", "awaqi.pdf"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
