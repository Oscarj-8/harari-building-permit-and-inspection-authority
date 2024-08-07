import multer from "multer";
import fs from "fs";
import path from "path";

const createMulterStorage = (
  destinationBasePath,
  userFolderKey = "fullName"
) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const userFolderName = req.body[userFolderKey];

      if (!userFolderName) {
        return cb(new Error("Folder name is not provided in the request"));
      }

      const userFolder = path.join(
        process.cwd(),
        destinationBasePath,
        userFolderName
      );

      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
      }

      cb(null, userFolder);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
};

const createMulterInstance = (
  destinationBasePath,
  userFolderKey = "fullName"
) => {
  const storage = createMulterStorage(destinationBasePath, userFolderKey);

  return multer({ storage: storage });
};

export default createMulterInstance;
