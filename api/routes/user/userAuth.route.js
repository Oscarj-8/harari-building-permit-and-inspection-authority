import express from "express";
import {
  signup,
  signin,
  signout,
} from "../../controllers/user/userAuth.controller.js";

const router = express.Router();

router.post("/user-signup", signup);
router.post("/user-signin", signin);
router.get("/user-signout", signout);

export default router;
