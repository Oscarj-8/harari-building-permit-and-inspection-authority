import express from "express";
import { handleFileUpload } from "../controllers/fileUpload.controller.js"; // Update the path accordingly

const fileUploadRouter = express.Router();

// File upload route
fileUploadRouter.post("/", handleFileUpload);

export default fileUploadRouter;
