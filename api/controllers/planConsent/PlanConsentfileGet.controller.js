import path from "path";
import fs from "fs";
import archiver from "archiver";
import { errorHandler } from "../../utils/error.js";

const getUserFolders = (req, res) => {
  const uploadsPath = path.join(process.cwd(), "api/planConsentFolder");

  fs.readdir(uploadsPath, (err, folders) => {
    if (folders.length === 0) {
      return res.status(200).json({ message: "No new folders or requests" });
    }
    if (err) {
      return res.status(500).json({ message: "Error fetching user folders" });
    }

    res.status(200).json({ userFolders: folders });
  });
};

const downloadFolder = (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(
    process.cwd(),
    "api/planConsentFolder",
    folderName
  );

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  archive.pipe(res);

  archive.directory(folderPath, folderName);

  archive.finalize();
};

const deleteFolder = (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(
    process.cwd(),
    "api/planConsentFolder",
    folderName
  );

  // Remove the folder
  fs.rmSync(folderPath, { recursive: true });

  res.status(200).json({ message: "Folder deleted successfully" });
};

export { getUserFolders, downloadFolder, deleteFolder };
