// import { NewLicenseForm } from "../../models/constructionRegulatory/constructionRegulatory.model.js";

// const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await NewLicenseForm.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export default getUserById;

// import { NewLicenseForm } from "../../models/constructionRegulatory/constructionRegulatory.model.js";
// import path from "path";
// import fs from "fs";
// import util from "util";

// const readFile = util.promisify(fs.readFile);
// const __dirname = path.resolve();

// const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await NewLicenseForm.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const imageFields = [
//       "idCard",
//       "educationEvidence",
//       "transcript",
//       "COC",
//       "applicantPhoto",
//     ];
//     let images = {};

//     for (const field of imageFields) {
//       if (user[field] && user[field].path) {
//         const filePath = path.join(__dirname, user[field].path);
//         if (fs.existsSync(filePath)) {
//           const fileData = await readFile(filePath);
//           images[field] = fileData.toString("base64");
//         }
//       }
//     }

//     console.log(images);

//     res.json({ user, images });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export default getUserById;

import { NewLicenseForm } from "../../models/constructionRegulatory/constructionRegulatory.model.js";
import path from "path";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await NewLicenseForm.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const imageFields = [
      "idCard",
      "educationEvidence",
      "transcript",
      "COC",
      "applicantPhoto",
    ];
    let images = {};

    for (const field of imageFields) {
      if (user[field] && user[field].path) {
        const filePath = user[field].path;
        if (fs.existsSync(filePath)) {
          try {
            const fileData = await readFile(filePath);
            images[field] = fileData.toString("base64");
          } catch (readError) {
            console.error(`Error reading file for ${field}:`, readError);
          }
        } else {
          console.warn(`File does not exist for ${field}: ${filePath}`);
        }
      } else {
        console.warn(`No path found for ${field}`);
      }
    }

    res.json({ user, images });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default getUserById;
