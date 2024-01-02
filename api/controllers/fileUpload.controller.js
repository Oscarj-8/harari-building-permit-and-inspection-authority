import multer from "multer";
import mongoose from "mongoose";

const conn = mongoose.connection;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads"); // Specify upload destination
  },
  filename: (req, file, cb) => {
    // Custom filename logic (optional)
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    // File filtering logic (optional)
    cb(null, true);
  },
});

const upload = multer({ storage });

export default upload.single("file");
