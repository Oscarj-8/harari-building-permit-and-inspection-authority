import express from "express";
import multer from "multer";
import fileUploadController from "../controllers/PlanConsentfileUpload.controller.js";
import fs from "fs";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //   const userIdentifier = ip.address();
    //   const userFolder = path.join(
    //     process.cwd(),
    //     "api/planConsentFolder",
    //     userIdentifier
    //   );

    //   if (!fs.existsSync(userFolder)) {
    //     fs.mkdirSync(userFolder, { recursive: true });
    //   }

    //   cb(null, userFolder);
    // },
    const username = req.user.username;
    const uniqueFolername = username + "-" + Math.round(Math.random() * 1e9);
    if (!username) {
      return cb(new Error("Username not provided in the request"));
    }

    const userFolder = path.join(
      process.cwd(),
      "api/planConsentFolder",
      uniqueFolername
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
  "/uploadplanconsent",
  upload.fields([{ name: "file", maxCount: 1 }, { name: "scannedImages" }]),
  fileUploadController
);

export default router;

// import express from "express";
// import multer from "multer";
// import fileUploadController from "../controllers/PlanConsentfileUpload.controller.js";
// import { v4 as uuidv4 } from "uuid"; // Import UUID library
// import fs from "fs";
// import path from "path";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const userIdentifier = uuidv4();

//     const userFolder = path.join(
//       process.cwd(),
//       "api/planConsentFolder",
//       userIdentifier
//     );

//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder, { recursive: true }); // Create the folder only if it doesn't exist
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

// import express from "express";
// import multer from "multer";
// import fileUploadController from "../controllers/PlanConsentfileUpload.controller.js";
// import { v4 as uuidv4 } from "uuid";
// import fs from "fs";
// import path from "path";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const userIdentifier =
//       req.session.userIdentifier + Math.round(Math.random() * 1e9) ||
//       (req.session.userIdentifier = uuidv4()); // Generate or retrieve from session
//     const userFolder = path.join(
//       process.cwd(),
//       "api/planConsentFolder",
//       userIdentifier
//     );

//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder, { recursive: true }); // Create folder only if it doesn't exist
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
