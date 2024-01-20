// import express from "express";
// import multer from "multer";
// import fileUploadController from "../controllers/PlanConsentfileUpload.controller.js";
// import ip from "ip";
// import fs from "fs";
// import path from "path";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const userIdentifier = ip.address();
//     const userFolder = path.join(
//       process.cwd(),
//       "api/planConsentFolder",
//       userIdentifier
//     );

//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder, { recursive: true });
//     }

//     cb(null, userFolder);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileName = `${uniqueSuffix}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

// router.post(
//   "/uploadplanconsent",
//   upload.fields([{ name: "file", maxCount: 1 }, { name: "scannedImages" }]),
//   fileUploadController
// );

// export default router;

import express from "express";
import multer from "multer";
import fileUploadController from "../controllers/PlanConsentfileUpload.controller.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import fs from "fs";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userIdentifier = req.session.userIdentifier || uuidv4(); // Get userIdentifier from session or create a new one
    req.session.userIdentifier = userIdentifier; // Store in session for subsequent uploads

    const userFolder = path.join(
      process.cwd(),
      "api/planConsentFolder",
      userIdentifier
    );

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true }); // Create the folder only if it doesn't exist
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
  "/uploadplanconsent",
  upload.fields([{ name: "file", maxCount: 1 }, { name: "scannedImages" }]),
  fileUploadController
);

export default router;
