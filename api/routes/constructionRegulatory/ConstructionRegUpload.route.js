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
