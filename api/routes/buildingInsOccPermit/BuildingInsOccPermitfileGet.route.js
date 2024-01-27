import express from "express";
import {
  getUserFolders,
  downloadFolder,
  deleteFolder,
} from "../../controllers/buildingInsOccPermit/BuildingInsOccPermitfileGet.controller.js";
import { verifyToken } from "../../utils/verifyAdmin.js";

const router = express.Router();

router.get("/user-buildingIns-folders", getUserFolders);
router.get("/download-buildingIns/:folderName", downloadFolder);
router.delete("/delete-buildingIns/:folderName", verifyToken, deleteFolder);

export default router;
