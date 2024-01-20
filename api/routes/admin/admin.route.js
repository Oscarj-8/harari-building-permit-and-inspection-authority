import express from "express";
import { verifyToken } from "../../utils/verifyAdmin.js";
import {
  updateAdmin,
  deleteAdmin,
} from "../../controllers/admin/admin.controller.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateAdmin);
router.delete("/delete/:id", verifyToken, deleteAdmin);

export default router;
