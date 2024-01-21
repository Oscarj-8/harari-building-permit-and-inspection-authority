import express from "express";
import {
  getUserFolders,
  downloadFolder,
  deleteFolder,
} from "../../controllers/planConsent/PlanConsentfileGet.controller.js";
import { verifyToken } from "../../utils/verifyAdmin.js";

const router = express.Router();

router.get("/user-folders", getUserFolders);
router.get("/download/:folderName", downloadFolder);
router.delete("/delete/:folderName", verifyToken, deleteFolder);

export default router;
