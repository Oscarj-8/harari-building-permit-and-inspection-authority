// import { log } from "console";
// import FileModel from "../models/file.model.js";
// import fs from "fs";
// import path from "path";

// const getAllFiles = async (req, res) => {
//   try {
//     const files = await FileModel.find({}, { name: 1, path: 1, _id: 1 });

//     const filesWithContent = await Promise.all(
//       files.map(async (file) => {
//         if (!file.path) {
//           console.error(`File with _id ${file._id} has no 'path' field.`);
//           return {
//             _id: file._id,
//             name: file.name,
//             content: "File path is not available.",
//           };
//         }

//         const filePath = path.resolve(process.cwd(), "api/uploads", file.path);

//         try {
//           const fileContent = await fs.promises.readFile(filePath);
//           return {
//             _id: file._id,
//             name: file.name,
//             path: file.path,
//             content: fileContent.toString("base64"),
//           };
//         } catch (readError) {
//           console.error(
//             `Error reading file with _id ${file._id}:`,
//             readError.message
//           );
//           console.error("Full error:", readError);
//           console.error("File path:", filePath);
//           return {
//             _id: file._id,
//             name: file.name,
//             content: "Error reading file content.",
//           };
//         }
//       })
//     );

//     res.json({ files: filesWithContent });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching files", error: error.message });
//   }
// };

// export default getAllFiles;

// import FileModel from "../models/file.model.js";
// import fs from "fs";
// import path from "path";

// const getAllFiles = async (req, res) => {
//   try {
//     // Assuming "file" is the name of the document file field
//     const documentFile = req.files["file"][0];
//     const scannedImages = req.files["scannedImages"];

//     // Your existing code to fetch files from the database remains unchanged
//     const filesFromDB = await FileModel.find({}, { name: 1, path: 1, _id: 1 });

//     const filesWithContent = await Promise.all(
//       filesFromDB.map(async (file) => {
//         // Construct the path to the user's folder
//         const userFolder = path.join(process.cwd(), "api/uploads", file.path);

//         // Check if the folder exists
//         if (!fs.existsSync(userFolder)) {
//           return {
//             _id: file._id,
//             name: file.name,
//             content: "User folder not found.",
//           };
//         }

//         // Read the files in the user's folder
//         const filesInFolder = fs.readdirSync(userFolder);

//         // Include folder content in the response
//         return {
//           _id: file._id,
//           name: file.name,
//           folder: userFolder,
//           content: filesInFolder,
//         };
//       })
//     );

//     res.json({ files: filesWithContent });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching files", error: error.message });
//   }
// };

// export default getAllFiles;

// import FileModel from "../models/file.model.js";
// import fs from "fs";
// import path from "path";

// const getAllFiles = async (req, res) => {
//   try {
//     const filesFromDB = await FileModel.find({}, { name: 1, path: 1, _id: 1 });

//     const filesWithContent = await Promise.all(
//       filesFromDB.map(async (file) => {
//         const userFolder = path.join(process.cwd(), "api/uploads", file.path);
//         const filesInFolder = fs.existsSync(userFolder)
//           ? fs.readdirSync(userFolder)
//           : [];

//         const content = await Promise.all(
//           filesInFolder.map(async (fileName) => {
//             const filePath = path.join(userFolder, fileName);
//             const fileContent = await fs.promises.readFile(filePath);
//             return {
//               name: fileName,
//               content: fileContent.toString("base64"),
//             };
//           })
//         );

//         return {
//           _id: file._id,
//           name: file.name,
//           folder: userFolder,
//           content: content,
//         };
//       })
//     );

//     res.json({ files: filesWithContent });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching files", error: error.message });
//   }
// };

// export default getAllFiles;

// import path from "path";
// import fs from "fs";

// const getUserFolders = (req, res) => {
//   const uploadsPath = path.join(process.cwd(), "api/uploads");

//   // Read all folders in the uploads directory
//   fs.readdir(uploadsPath, (err, folders) => {
//     if (err) {
//       return res.status(500).json({ message: "Error fetching user folders" });
//     }

//     // Send the list of folders to the client
//     res.status(200).json({ userFolders: folders });
//   });
// };

// export default getUserFolders;

// file: fileGet.controller.js
import path from "path";
import fs from "fs";
import archiver from "archiver";

const getUserFolders = (req, res) => {
  const uploadsPath = path.join(process.cwd(), "api/uploads");

  // Read all folders in the uploads directory
  fs.readdir(uploadsPath, (err, folders) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching user folders" });
    }

    // Send the list of folders to the client
    res.status(200).json({ userFolders: folders });
  });
};

const downloadFolder = (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(process.cwd(), "api/uploads", folderName);

  // Create a ZIP archive
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Compression level
  });

  // Pipe the archive to the response
  archive.pipe(res);

  // Add the folder to the archive
  archive.directory(folderPath, folderName);

  // Finalize the archive and send it to the client
  archive.finalize();
};

export { getUserFolders, downloadFolder };
