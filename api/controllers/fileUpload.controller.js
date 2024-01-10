// // import FileModel from "../models/file.model.js";

// // const uploadFile = async (req, res) => {
// //   try {
// //     const uniqueFileName = req.file.filename;

// //     const newFile = new FileModel({
// //       name: uniqueFileName,
// //       path: req.file.path,
// //     });
// //     await newFile.save();

// //     res.status(201).json({ message: "File uploaded successfully" });
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ message: "File upload failed", error: error.message });
// //   }
// // };

// // export default uploadFile;

// import FileModel from "../models/file.model.js";
// import ip from "ip";
// import path from "path"; // Add this import statement
// import fs from "fs";

// const uploadFile = async (req, res) => {
//   try {
//     // Normalize IP address to handle IPv6-mapped IPv4 addresses
//     const userIdentifier = ip.address();
//     const userFolder = path.join(process.cwd(), "api/uploads", userIdentifier);

//     const documentFile = req.files["file"][0];
//     const scannedImages = req.files["scannedImages"];

//     // Check if the folder exists, create it if not
//     if (!fs.existsSync(userFolder)) {
//       fs.mkdirSync(userFolder, { recursive: true });
//     }

//     // Handle document file
//     const uniqueDocumentFileName = documentFile.filename;
//     const documentFilePath = path.join(userFolder, uniqueDocumentFileName);
//     const newDocumentFile = new FileModel({
//       name: uniqueDocumentFileName,
//       path: documentFilePath,
//     });
//     await newDocumentFile.save();

//     // Handle scanned images
//     const scannedImagesArray = [];
//     for (const scannedImage of scannedImages) {
//       const uniqueScannedImageName = scannedImage.filename;
//       const scannedImagePath = path.join(userFolder, uniqueScannedImageName);
//       const newScannedImage = new FileModel({
//         name: uniqueScannedImageName,
//         path: scannedImagePath,
//       });
//       await newScannedImage.save();
//       scannedImagesArray.push(newScannedImage);
//     }

//     res.status(201).json({ message: "Files uploaded successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Files upload failed", error: error.message });
//   }
// };

// export default uploadFile;

import FileModel from "../models/file.model.js";
import path from "path";
import fs from "fs";

const uploadFile = async (req, res) => {
  try {
    // Extract user folder name from the uploaded document file path
    const filePath = req.files["file"][0].path;
    const userFolderName = path.basename(path.dirname(filePath));

    // Combine user folder name for a unique folder path
    const userFolder = path.join(process.cwd(), "api/uploads", userFolderName);

    // Check if the user folder exists, create it if not
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    // Handle document file
    const uniqueDocumentFileName = req.files["file"][0].filename;
    const documentFilePath = path.join(userFolder, uniqueDocumentFileName);
    const newDocumentFile = new FileModel({
      name: uniqueDocumentFileName,
      path: documentFilePath,
    });
    await newDocumentFile.save();

    // Handle scanned images
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
