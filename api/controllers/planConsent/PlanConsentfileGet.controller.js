import path from "path";
import fs from "fs";
import archiver from "archiver";
import { errorHandler } from "../../utils/error.js";

const getUserFolders = (req, res) => {
  const uploadsPath = path.join(process.cwd(), "api/planConsentFolder");
  const { page, pageSize } = req.query;
  const currentPage = parseInt(page) || 1;
  const size = parseInt(pageSize) || 10;
  const startIndex = (currentPage - 1) * size;
  const endIndex = currentPage * size;
  try {
    // Check if the directory exists
    if (!fs.existsSync(uploadsPath)) {
      res.status(200).json({ message: "No new folders or requests" });
      return;
    }

    const folders = fs.readdirSync(uploadsPath);

    if (!folders || (folders && folders.length === 0)) {
      res.status(200).json({ message: "No new folders or requests" });
    } else {
      const paginatedFolders = folders.slice(startIndex, endIndex);
      res.status(200).json({
        userFolders: paginatedFolders,
        totalPages: Math.ceil(folders.length / size),
      });
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
