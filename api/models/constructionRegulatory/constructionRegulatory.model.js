import mongoose from "mongoose";

const newLicenseFormSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  woreda: {
    type: String,
    required: true,
  },
  mobilePhone: {
    type: Number,
    required: true,
  },
  houseNumber: {
    type: Number,
    required: true,
  },
  subCity: {
    type: String,
    required: true,
  },
  currentOrganization: {
    type: String,
    required: true,
  },
  idCard: {
    name: { type: String, required: true },
    path: { type: String, required: true },
  },
  educationEvidence: {
    name: { type: String, required: true },
    path: { type: String, required: true },
  },
  transcript: {
    name: { type: String, required: true },
    path: { type: String, required: true },
  },
  COC: {
    name: { type: String, required: true },
    path: { type: String, required: true },
  },
  applicantPhoto: {
    name: { type: String, required: true },
    path: { type: String, required: true },
  },
  workExperience: {
    type: String,
    enum: ["The manager of PLC or Enterprise member", "Employee", "Unemployed"],
    required: true,
  },
});

const NewLicenseForm = mongoose.model("Form", newLicenseFormSchema);

export default NewLicenseForm;
