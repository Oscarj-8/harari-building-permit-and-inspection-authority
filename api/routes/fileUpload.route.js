// import express from "express";
// import multer from "multer";
// import path from "path";
// import uploadFile from "../controllers/fileUpload.controller.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.join(process.cwd(), "api/uploads");
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileName = `${uniqueSuffix}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/upload", upload.single("file"), uploadFile);

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import uploadFile from "../controllers/fileUpload.controller.js";
import ip from "ip";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a user-specific subfolder based on normalized IP address and timestamp
    const userIdentifier = ip.address();
    const userFolder = path.join(process.cwd(), "api/uploads", userIdentifier);

    // Check if the folder exists, create it if not
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileName = `${file.fieldname}-${uniqueSuffix}-${Math.round(
      Math.random() * 1e9
    )}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.fields([{ name: "file", maxCount: 1 }, { name: "scannedImages" }]),
  uploadFile
);

export default router;
