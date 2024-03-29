import path from "path";
import fs from "fs";
import archiver from "archiver";

const getUserFolders = (req, res) => {
  const uploadsPath = path.join(
    process.cwd(),
    "api/buildingInsOccPermitFolder"
  );

  try {
    if (!fs.existsSync(uploadsPath)) {
      res.status(200).json({ message: "No new folders or requests" });
      return;
    }

    const folders = fs.readdirSync(uploadsPath);

    if (!folders || (folders && folders.length === 0)) {
      res.status(200).json({ message: "No new folders or requests" });
    } else {
      res.status(200).json({ userFolders: folders });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ message: "User folder directory not found" });
    } else {
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
    "api/buildingInsOccPermitFolder",
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
    "api/buildingInsOccPermitFolder",
    folderName
  );

  fs.rmSync(folderPath, { recursive: true });

  res.status(200).json({ message: "Folder deleted successfully" });
};

export { getUserFolders, downloadFolder, deleteFolder };
