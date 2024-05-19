import { NewLicenseForm } from "../../models/constructionRegulatory/constructionRegulatory.model.js";
import fs from "fs/promises";
import path from "path";

const basePath = "/api/constructionReg/newConstructionReg";

const getConstructionRegList = async (req, res) => {
  try {
    let documents = await NewLicenseForm.find();

    // Convert all images to base64
    documents = await Promise.all(
      documents.map(async (document) => {
        if (
          !document.idCard ||
          !document.educationEvidence ||
          !document.transcript ||
          !document.COC ||
          !document.applicantPhoto
        ) {
          console.error("Document is missing necessary properties:", document);
          return document; // Skip this document if it's missing necessary properties
        }

        const folderPath = path.join(
          process.cwd(),
          basePath,
          document.fullName
        );

        const idCardPath = path.join(folderPath, document.idCard.name);
        const educationEvidencePath = path.join(
          folderPath,
          document.educationEvidence.name
        );
        const transcriptPath = path.join(folderPath, document.transcript.name);
        const COCPath = path.join(folderPath, document.COC.name);
        const applicantPhotoPath = path.join(
          folderPath,
          document.applicantPhoto.name
        );

        document.idCard.base64 = await convertImageToBase64(idCardPath);
        document.educationEvidence = await convertImageToBase64(
          educationEvidencePath
        );
        document.transcript = await convertImageToBase64(transcriptPath);
        document.COC = await convertImageToBase64(COCPath);
        document.applicantPhoto = await convertImageToBase64(
          applicantPhotoPath
        );
        return document;
      })
    );

    // Check if all images have base64 representation
    const allImagesBase64 = documents.every(
      (document) =>
        document.idCard.base64 &&
        document.educationEvidence.base64 &&
        document.transcript.base64 &&
        document.COC.base64 &&
        document.applicantPhoto.base64
    );

    console.log(documents.map((d) => d.idCard.base64));

    res.json({
      success: true,
      data: documents,
    });
    // console.log(
    //   documents.map((data) => ({
    //     fullName: data.fullName,
    //     idCard: data.base64, // Log only base64 for idCard
    //   }))
    // );
  } catch (err) {
    console.error("Error fetching construction reg list:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const convertImageToBase64 = async (imagePath) => {
  try {
    const imageData = await fs.readFile(imagePath);
    const base64String = Buffer.from(imageData).toString("base64");
    return base64String;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null; // or throw error if you want to handle it elsewhere
  }
};

export { getConstructionRegList };
