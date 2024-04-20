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
  educationalData: {
    type: [String],
    required: true,
  },
  idCard: {
    type: String,
    required: true,
  },
  educationEvidence: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
  COC: {
    type: String,
    required: true,
  },
  applicantPhoto: {
    type: String,
    required: true,
  },
  workExperience: {
    type: String,
    enum: ["The manager of PLC or Enterprise member", "Employee", "Unemployed"],
    required: true,
  },
});

const newLicenseFormModel = mongoose.model("Form", newLicenseFormSchema);

export default newLicenseFormModel;
