import path from "path";
import fs from "fs";
import archiver from "archiver";
import { errorHandler } from "../../utils/error.js";

const getUserFolders = (req, res) => {
  const uploadsPath = path.join(process.cwd(), "api/planConsentFolder");

  // fs.readdir(uploadsPath, (err, folders) => {
  //   if (folders || folders.length === 0) {
  //     return res.status(200).json({ message: "No new folders or requests" });
  //   } else if (err) {
  //     return res
  //       .status(500)
  //       .json({ message: "Error fetching user folders", error: err });
  //   } else {
  //     res.status(200).json({ userFolders: folders });
  //   }
  // });
  try {
    const folders = fs.readdirSync(uploadsPath);

    if (!folders || folders.length === 0) {
      res.status(200).json({ message: "No new folders or requests" });
    } else {
      res.status(200).json({ userFolders: folders });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ message: "User folder directory not found" });
    } else {
      // Handle other errors
      res
        .status(500)
        .json({ message: "Error fetching user folders", error: error });
    }
  }
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
