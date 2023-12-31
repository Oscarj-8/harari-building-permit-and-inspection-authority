// api/controllers/fileUpload.controller.js
import multer from "multer";
import path from "path";
import File from "../models/file.model.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Declare uploadsPath outside the destination function
let uploadsPath;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set uploadsPath here
    uploadsPath = path.resolve(__dirname, "../uploads");
    console.log("Destination Path:", uploadsPath);
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const handleFileUpload = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.log("File upload error:", err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    const { originalname, path } = req.file;

    try {
      const newFile = new File({ originalname, path });
      await newFile.save();
      res.json({ message: "File uploaded successfully" });
    } catch (error) {
      console.error("Error saving file information to database:", error);
      res
        .status(500)
        .json({ error: "Error saving file information to database" });
    }
  });
};
