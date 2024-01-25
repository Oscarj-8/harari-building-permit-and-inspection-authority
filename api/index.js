import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminAuthRouter from "./routes/admin/adminAuth.route.js";
import userAuthRouter from "./routes/user/userAuth.route.js";
import adminRouter from "./routes/admin/admin.route.js";
import userRouter from "./routes/user/user.route.js";
import planConsentfileUpload from "./routes/planConsent/PlanConsentfileUpload.route.js";
import planConsentFileGetRoutes from "./routes/planConsent/PlanConsentfileGet.route.js";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", planConsentfileUpload);
app.use("/api", planConsentFileGetRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", adminAuthRouter);
app.use("/api/user-auth", userAuthRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
