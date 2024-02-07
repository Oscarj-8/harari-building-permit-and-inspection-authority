import express from "express";
import { formUpload } from "../../controllers/constructionRegulatory/ConstructionRegUpload.controller.js";
const route = express.Router();

route.post("/submit-construction-reg-form", formUpload);

export default route;
