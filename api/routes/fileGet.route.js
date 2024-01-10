// import express from "express";
// import getAllFiles from "../controllers/fileGet.controller.js";

// const router = express.Router();

// router.get("/files", getAllFiles);

// export default router;

// import express from "express";
// import getUserFolders from "../controllers/fileGet.controller.js";

// const router = express.Router();

// router.get("/user-folders", getUserFolders);

// export default router;

// file: router.js
import express from "express";
import {
  getUserFolders,
  downloadFolder,
} from "../controllers/fileGet.controller.js";

const router = express.Router();

router.get("/user-folders", getUserFolders);
router.get("/download/:folderName", downloadFolder);

export default router;
