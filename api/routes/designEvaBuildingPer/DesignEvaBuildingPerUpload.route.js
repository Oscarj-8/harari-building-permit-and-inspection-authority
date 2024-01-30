import express from "express";
import multer from "multer";
import fileUploadController from "../../controllers/designEvaBuildingPer/DesignEvaBuildingPerFileUpload.controller.js";
import fs from "fs";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const username = req.body.username;

    if (!username) {
      return cb(new Error("Username not provided in the request"));
    }

    const userFolder = path.join(
      process.cwd(),
      "api/designEvaBuildingPerFolder",
      username
    );

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/uploadDesignEvaBuildingPer",
  upload.fields([{ name: "files", maxCount: 2 }, { name: "scannedImages" }]),
  fileUploadController
);

export default router;
