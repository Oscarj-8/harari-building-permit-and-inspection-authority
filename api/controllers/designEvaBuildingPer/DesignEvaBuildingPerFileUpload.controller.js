import FileModel from "../../models/file.model.js";
import path from "path";
import fs from "fs";

const uploadFile = async (req, res) => {
  try {
    const documentFiles = req.files["files"];
    const userFolderName = path.basename(path.dirname(documentFiles[0].path));
    const userFolder = path.join(
      process.cwd(),
      "api/designEvaBuildingPerFolder",
      userFolderName
    );

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    for (const documentFile of documentFiles) {
      const uniqueDocumentFileName = documentFile.filename;
      const documentFilePath = path.join(userFolder, uniqueDocumentFileName);
      const newDocumentFile = new FileModel({
        name: uniqueDocumentFileName,
        path: documentFilePath,
      });
      await newDocumentFile.save();
    }

    const scannedImages = req.files["scannedImages"];
    for (const scannedImage of scannedImages) {
      const uniqueScannedImageName = scannedImage.filename;
      const scannedImagePath = path.join(userFolder, uniqueScannedImageName);
      const newScannedImage = new FileModel({
        name: uniqueScannedImageName,
        path: scannedImagePath,
      });
      await newScannedImage.save();
    }

    res.status(201).json({ message: "Files uploaded successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Files upload failed", error: error.message });
  }
};

export default uploadFile;
