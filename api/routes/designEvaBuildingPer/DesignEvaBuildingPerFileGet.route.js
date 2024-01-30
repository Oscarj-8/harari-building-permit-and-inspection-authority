import express from "express";
import {
  getUserFolders,
  downloadFolder,
  deleteFolder,
} from "../../controllers/designEvaBuildingPer/DesignEvaBuildingPerFileGet.controller.js";
import { verifyToken } from "../../utils/verifyAdmin.js";

const router = express.Router();

router.get("/user-designEval-folders", getUserFolders);
router.get("/download-designEval/:folderName", downloadFolder);
router.delete("/delete-designEval/:folderName", verifyToken, deleteFolder);

export default router;
