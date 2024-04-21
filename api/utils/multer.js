import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fullName = req.body.fullName;

    if (!fullName) {
      return cb(new Errooor("Full name is not provided in the request"));
    }

    const userFolder = path.join(
      process.cwd(),
      "/api/constructionReg/newConstructionReg",
      fullName
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

const upload = multer({ storage: storage });

export default upload;
