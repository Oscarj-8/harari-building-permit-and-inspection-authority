// import NewLicenseForm from "../../models/constructionRegulatory/constructionRegulatory.model.js";
// import fs from "fs/promises";
// import path from "path";

// const basePath = "/api/constructionReg/newConstructionReg";

// const getConstructionRegList = async (req, res) => {
//   const folderPath = path.join(process.cwd(), basePath, "Lane Jr Junior");
//   console.log("folder path is: ", folderPath);
//   const folderContents = await fs.readdir(folderPath);

//   // Log the contents of the folder
//   console.log("Contents of the folder:");
//   console.log(folderContents);

//   try {
//     const documents = await NewLicenseForm.find();
//     for (let document of documents) {
//       const idCardPath = path.join(
//         process.cwd(),
//         basePath,
//         `${document.fullName}/${document.idCard.name}`
//       );
//       const educationEvidencePath = path.join(
//         process.cwd(),
//         basePath,
//         `${document.fullName}/${document.educationEvidence.name}`
//       );
//       const transcriptPath = path.join(
//         process.cwd(),
//         basePath,
//         `${document.fullName}/${document.transcript.name}`
//       );
//       const COCPath = path.join(
//         process.cwd(),
//         basePath,
//         `${document.fullName}/${document.COC.name}`
//       );
//       const applicantPhotoPath = path.join(
//         process.cwd(),
//         basePath,
//         `${document.fullName}/${document.applicantPhoto.name}`
//       );

//       document.idCard = {
//         ...document.idCard,
//         base64: await convertImageToBase64(idCardPath),
//       };
//       document.educationEvidence = {
//         ...document.educationEvidence,
//         base64: await convertImageToBase64(educationEvidencePath),
//       };
//       document.transcript = {
//         ...document.transcript,
//         base64: await convertImageToBase64(transcriptPath),
//       };
//       document.COC = {
//         ...document.COC,
//         base64: await convertImageToBase64(COCPath),
//       };
//       document.applicantPhoto = {
//         ...document.applicantPhoto,
//         base64: await convertImageToBase64(applicantPhotoPath),
//       };
//     }

//     res.json({ success: true, data: documents });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// export const convertImageToBase64 = async (imagePath) => {
//   const imageData = await fs.readFile(imagePath);
//   return Buffer.from(imageData).toString("base64");
// };
// export { getConstructionRegList };

import NewLicenseForm from "../../models/constructionRegulatory/constructionRegulatory.model.js";
import fs from "fs/promises";
import path from "path";

const basePath = "/api/constructionReg/newConstructionReg";

const getConstructionRegList = async (req, res) => {
  const folderPath = path.join(process.cwd(), basePath, "Lane Jr Junior");
  console.log("folder path is: ", folderPath);
  const folderContents = await fs.readdir(folderPath);

  // Log the contents of the folder
  console.log("Contents of the folder:");
  console.log(folderContents);

  try {
    const documents = await NewLicenseForm.find();
    for (let document of documents) {
      const idCardPath = path.join(
        process.cwd(),
        basePath,
        `${document.fullName}/${document.idCard.name}`
      );
      const educationEvidencePath = path.join(
        process.cwd(),
        basePath,
        `${document.fullName}/${document.educationEvidence.name}`
      );
      const transcriptPath = path.join(
        process.cwd(),
        basePath,
        `${document.fullName}/${document.transcript.name}`
      );
      const COCPath = path.join(
        process.cwd(),
        basePath,
        `${document.fullName}/${document.COC.name}`
      );
      const applicantPhotoPath = path.join(
        process.cwd(),
        basePath,
        `${document.fullName}/${document.applicantPhoto.name}`
      );

      const idCardBase64 = await convertImageToBase64(idCardPath);
      const educationEvidenceBase64 = await convertImageToBase64(
        educationEvidencePath
      );
      const transcriptBase64 = await convertImageToBase64(transcriptPath);
      const COCBase64 = await convertImageToBase64(COCPath);
      const applicantPhotoBase64 = await convertImageToBase64(
        applicantPhotoPath
      );

      document.idCard.base64 = idCardBase64;
      document.educationEvidence.base64 = educationEvidenceBase64;
      document.transcript.base64 = transcriptBase64;
      document.COC.base64 = COCBase64;
      document.applicantPhoto.base64 = applicantPhotoBase64;
    }

    res.json({ success: true, data: documents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const convertImageToBase64 = async (imagePath) => {
  const imageData = await fs.readFile(imagePath);
  return Buffer.from(imageData).toString("base64");
};

export { getConstructionRegList };
