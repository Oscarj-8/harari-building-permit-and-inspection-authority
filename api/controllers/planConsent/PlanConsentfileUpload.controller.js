import FileModel from "../../models/file.model.js";
import path from "path";
import fs from "fs";

const uploadFile = async (req, res) => {
  try {
    const filePath = req.files["file"][0].path;
    const userFolderName = path.basename(path.dirname(filePath));

    const userFolder = path.join(
      process.cwd(),
      "api/planConsentFolder",
      userFolderName
    );

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    const uniqueDocumentFileName = req.files["file"][0].filename;
    const documentFilePath = path.join(userFolder, uniqueDocumentFileName);
    const newDocumentFile = new FileModel({
      name: uniqueDocumentFileName,
      path: documentFilePath,
    });
    await newDocumentFile.save();

    const scannedImagesArray = [];
    for (const scannedImage of req.files["scannedImages"]) {
      const uniqueScannedImageName = scannedImage.filename;
      const scannedImagePath = path.join(userFolder, uniqueScannedImageName);
      const newScannedImage = new FileModel({
        name: uniqueScannedImageName,
        path: scannedImagePath,
      });
      await newScannedImage.save();
      scannedImagesArray.push(newScannedImage);
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
