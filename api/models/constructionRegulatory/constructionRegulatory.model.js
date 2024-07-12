// import mongoose from "mongoose";

// const newLicenseFormSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   woreda: {
//     type: String,
//     required: true,
//   },
//   mobilePhone: {
//     type: Number,
//     required: true,
//   },
//   houseNumber: {
//     type: Number,
//     required: true,
//   },
//   kebele: {
//     type: String,
//     required: true,
//   },
//   currentOrganization: {
//     type: String,
//     required: true,
//   },
//   educationalData: {
//     type: Array,
//     required: true,
//   },
//   idCard: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   educationEvidence: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   transcript: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   COC: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   applicantPhoto: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   workExperience: {
//     type: String,
//     enum: ["The manager of PLC or Enterprise member", "Employee", "Unemployed"],
//     required: true,
//   },
//   competencyCertification: {
//     name: { type: String },
//     path: { type: String },
//   },
//   businessLicense: {
//     name: { type: String },
//     path: { type: String },
//   },
//   contractAgreement: {
//     name: { type: String },
//     path: { type: String },
//   },
//   paymentDocument: {
//     name: { type: String },
//     path: { type: String },
//   },
//   performanceLetter: {
//     name: { type: String },
//     path: { type: String },
//   },
//   enterpriseArticles: {
//     name: { type: String },
//     path: { type: String },
//   },
//   byLaws: {
//     name: { type: String },
//     path: { type: String },
//   },
//   workExperiencePDF: {
//     name: { type: String },
//     path: { type: String },
//   },
// });

// const upgradeLicenseFormSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   woreda: {
//     type: String,
//     required: true,
//   },
//   mobilePhone: {
//     type: Number,
//     required: true,
//   },
//   houseNumber: {
//     type: Number,
//     required: true,
//   },
//   kebele: {
//     type: String,
//     required: true,
//   },
//   currentOrganization: {
//     type: String,
//     required: true,
//   },
//   idCard: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   educationEvidence: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   transcript: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   COC: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   applicantPhoto: {
//     name: { type: String, required: true },
//     path: { type: String, required: true },
//   },
//   workExperience: {
//     type: String,
//     enum: ["The manager of PLC or Enterprise member", "Employee", "Unemployed"],
//     required: true,
//   },
//   competencyCertification: {
//     name: { type: String },
//     path: { type: String },
//   },
//   businessLicense: {
//     name: { type: String },
//     path: { type: String },
//   },
//   contractAgreement: {
//     name: { type: String },
//     path: { type: String },
//   },
//   paymentDocument: {
//     name: { type: String },
//     path: { type: String },
//   },
//   performanceLetter: {
//     name: { type: String },
//     path: { type: String },
//   },
//   enterpriseArticles: {
//     name: { type: String },
//     path: { type: String },
//   },
//   byLaws: {
//     name: { type: String },
//     path: { type: String },
//   },
//   workExperiencePDF: {
//     name: { type: String },
//     path: { type: String },
//   },
//   businessLicenseProprietor: {
//     name: { type: String },
//     path: { type: String },
//   },
//   testimonial: {
//     name: { type: String },
//     path: { type: String },
//   },
//   companyLicense: {
//     name: { type: String },
//     path: { type: String },
//   },
// });

// export const NewLicenseForm = mongoose.model("Form", newLicenseFormSchema);
// export const UpgradeLicenseForm = mongoose.model(
//   "Form3",
//   upgradeLicenseFormSchema
// );

import mongoose from "mongoose";

const educationalDataSchema = new mongoose.Schema({
  educationLevel: { type: String, required: true },
  institution: { type: String, required: true },
  country: { type: String, required: true },
  graduation: { type: String, required: true },
  qualification: { type: String, required: true },
  remarks: { type: String, required: true },
});

const newLicenseFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  woreda: { type: String, required: true },
  mobilePhone: { type: Number, required: true },
  houseNumber: { type: Number, required: true },
  kebele: { type: String, required: true },
  currentOrganization: { type: String, required: true },
  educationalData: { type: [educationalDataSchema], required: true },
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
  competencyCertification: {
    name: { type: String },
    path: { type: String },
  },
  businessLicense: {
    name: { type: String },
    path: { type: String },
  },
  contractAgreement: {
    name: { type: String },
    path: { type: String },
  },
  paymentDocument: {
    name: { type: String },
    path: { type: String },
  },
  performanceLetter: {
    name: { type: String },
    path: { type: String },
  },
  enterpriseArticles: {
    name: { type: String },
    path: { type: String },
  },
  byLaws: {
    name: { type: String },
    path: { type: String },
  },
  workExperiencePDF: {
    name: { type: String },
    path: { type: String },
  },
});

const upgradeLicenseFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  woreda: { type: String, required: true },
  mobilePhone: { type: Number, required: true },
  houseNumber: { type: String, required: true },
  kebele: { type: String, required: true },
  currentOrganization: { type: String, required: true },
  educationalData: { type: [educationalDataSchema], required: true },
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
  competencyCertification: {
    name: { type: String },
    path: { type: String },
  },
  businessLicense: {
    name: { type: String },
    path: { type: String },
  },
  contractAgreement: {
    name: { type: String },
    path: { type: String },
  },
  paymentDocument: {
    name: { type: String },
    path: { type: String },
  },
  performanceLetter: {
    name: { type: String },
    path: { type: String },
  },
  enterpriseArticles: {
    name: { type: String },
    path: { type: String },
  },
  byLaws: {
    name: { type: String },
    path: { type: String },
  },
  workExperiencePDF: {
    name: { type: String },
    path: { type: String },
  },
  businessLicenseProprietor: {
    name: { type: String },
    path: { type: String },
  },
  testimonial: {
    name: { type: String },
    path: { type: String },
  },
  companyLicense: {
    name: { type: String },
    path: { type: String },
  },
});

export const NewLicenseForm = mongoose.model(
  "NewLicenseForm",
  newLicenseFormSchema
);
export const UpgradeLicenseForm = mongoose.model(
  "UpgradeLicenseForm",
  upgradeLicenseFormSchema
);
