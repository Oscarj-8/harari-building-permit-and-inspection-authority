import express from "express";
import handleMessages from "../../controllers/messages/messages.controller.js";
const router = express.Router();

router.post("/messages", handleMessages);
// router.get("/getMessages", getMessages);
export default router;
