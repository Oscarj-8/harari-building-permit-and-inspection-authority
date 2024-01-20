import express from "express";
import {
  getUserFolders,
  downloadFolder,
} from "../controllers/fileGet.controller.js";

const router = express.Router();

router.get("/user-folders", getUserFolders);
router.get("/download/:folderName", downloadFolder);

export default router;
