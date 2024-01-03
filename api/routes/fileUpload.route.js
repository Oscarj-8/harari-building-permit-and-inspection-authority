import express from "express";
import multer from "multer";
import path from "path"; // Import the path module
import uploadFile from "../controllers/fileUpload.controller.js";

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "api/uploads"); // Construct the absolute path to the uploads directory
    cb(null, uploadPath); // Set the absolute destination path for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName); // Set the filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

// Handle file upload
router.post("/upload", upload.single("file"), uploadFile);

export default router;
