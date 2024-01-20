import path from "path";
import fs from "fs";
import archiver from "archiver";

const getUserFolders = (req, res) => {
  const uploadsPath = path.join(process.cwd(), "api/uploads");

  fs.readdir(uploadsPath, (err, folders) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching user folders" });
    }

    res.status(200).json({ userFolders: folders });
  });
};

const downloadFolder = (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(process.cwd(), "api/uploads", folderName);

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  archive.pipe(res);

  archive.directory(folderPath, folderName);

  archive.finalize();
};

export { getUserFolders, downloadFolder };
