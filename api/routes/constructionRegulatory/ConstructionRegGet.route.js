import express from "express";
import { getConstructionRegList } from "../../controllers/constructionRegulatory/ConstructionRegGet.controller.js";

const router = express.Router();

router.get("/constructionReg-list", getConstructionRegList);

export default router;
