import express from "express";
import fileUpload from "../controllers/fileUpload.controller.js";

const router = express.Router();

// router.post("/upload", fileController.uploadFile);

router.post("/upload", fileUpload);

export default router;
