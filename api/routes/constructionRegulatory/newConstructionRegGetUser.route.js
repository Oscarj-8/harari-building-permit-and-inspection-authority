import express from "express";
import getUserById from "../../controllers/constructionRegulatory/newConstructionRegGetUser.controller.js";
const router = express.Router();

router.get("/:id", getUserById);

export default router;
