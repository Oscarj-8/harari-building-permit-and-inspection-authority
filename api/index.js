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
import buildingInsOccPermitfileUpload from "./routes/buildingInsOccPermit/BuildingInsOccPermitfileUpload.route.js";
import buildingInsOccPermitfileGetRoutes from "./routes/buildingInsOccPermit/BuildingInsOccPermitfileGet.route.js";
import designEvaBuildingPerFileUpload from "./routes/designEvaBuildingPer/DesignEvaBuildingPerUpload.route.js";
import designEvaBuildingPerFileGetRoutes from "./routes/designEvaBuildingPer/DesignEvaBuildingPerFileGet.route.js";
import constructionRegUploadRoute from "./routes/constructionRegulatory/ConstructionRegUpload.route.js";
import path from "path";
import messageRoute from "./routes/message/messages.route.js";

dotenv.config();

const mongoURI = process.env.MONGO;

mongoose
  .connect(mongoURI)
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
app.use("/api", buildingInsOccPermitfileUpload);
app.use("/api", buildingInsOccPermitfileGetRoutes);
app.use("/api", designEvaBuildingPerFileUpload);
app.use("/api", designEvaBuildingPerFileGetRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", adminAuthRouter);
app.use("/api/user-auth", userAuthRouter);
app.use("/api", messageRoute);
app.use("/api", constructionRegUploadRoute);

app.use(
  express.static(
    "/root/harari-building-permit-and-inspection-authority/client/dist"
  )
);

app.get("*", (req, res) => {
  res.sendFile(
    "/root/harari-building-permit-and-inspection-authority/client/dist/index.html"
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
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
