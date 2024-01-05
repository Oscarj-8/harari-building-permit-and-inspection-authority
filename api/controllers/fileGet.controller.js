import { log } from "console";
import FileModel from "../models/file.model.js";
import fs from "fs";
import path from "path";

const getAllFiles = async (req, res) => {
  try {
    const files = await FileModel.find({}, { name: 1, path: 1, _id: 1 });

    const filesWithContent = await Promise.all(
      files.map(async (file) => {
        if (!file.path) {
          console.error(`File with _id ${file._id} has no 'path' field.`);
          return {
            _id: file._id,
            name: file.name,
            content: "File path is not available.",
          };
        }

        const filePath = path.resolve(process.cwd(), "api/uploads", file.path);

        try {
          console.log("File path:", filePath);
          const fileContent = await fs.promises.readFile(filePath);
          console.log(fileContent);
          return {
            _id: file._id,
            name: file.name,
            path: file.path,
            content: fileContent.toString("base64"),
          };
        } catch (readError) {
          console.error(
            `Error reading file with _id ${file._id}:`,
            readError.message
          );
          console.error("Full error:", readError);
          console.error("File path:", filePath);
          return {
            _id: file._id,
            name: file.name,
            content: "Error reading file content.",
          };
        }
      })
    );

    res.json({ files: filesWithContent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching files", error: error.message });
  }
};

export default getAllFiles;
