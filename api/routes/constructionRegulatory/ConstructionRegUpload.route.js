import express from "express";
import { submitNewLicenseForm } from "../../controllers/constructionRegulatory/ConstructionRegUpload.controller.js";
const route = express.Router();

// Route to handle submission of new license form
route.post("/construction-regulatory/new-license", submitNewLicenseForm);

// // Route to handle submission of renewal form
// route.post("/renewal", constructionRegUploadController.submitRenewalForm);

// // Route to handle submission of upgrade form
// route.post("/upgrade", constructionRegUploadController.submitUpgradeForm);

export default route;
