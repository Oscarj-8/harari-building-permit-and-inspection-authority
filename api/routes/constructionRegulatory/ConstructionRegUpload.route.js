import express from "express";
import { submitNewLicenseForm } from "../../controllers/constructionRegulatory/ConstructionRegUpload.controller.js";
import createMulterInstance from "../../utils/multer.js";
const route = express.Router();
const multerInstance = createMulterInstance(
  "/api/constructionReg/newConstructionReg"
);
const upload = multerInstance.fields([
  { name: "idCard", maxCount: 1 },
  { name: "educationEvidence", maxCount: 1 },
  { name: "transcript", maxCount: 1 },
  { name: "COC", maxCount: 1 },
  { name: "applicantPhoto", maxCount: 1 },
  { name: "competencyCertification", maxCount: 1 },
  { name: "businessLicense", maxCount: 1 },
  { name: "contractAgreement", maxCount: 1 },
  { name: "paymentDocument", maxCount: 1 },
  { name: "performanceLetter", maxCount: 1 },
  { name: "enterpriseArticles", maxCount: 1 },
  { name: "byLaws", maxCount: 1 },
  { name: "workExperiencePDF", maxCount: 1 },
]);

route.post(
  "/construction-regulatory/new-license",
  upload,
  submitNewLicenseForm
);

// // Route to handle submission of renewal form
// route.post("/renewal", constructionRegUploadController.submitRenewalForm);

// // Route to handle submission of upgrade form
// route.post("/upgrade", constructionRegUploadController.submitUpgradeForm);

export default route;
