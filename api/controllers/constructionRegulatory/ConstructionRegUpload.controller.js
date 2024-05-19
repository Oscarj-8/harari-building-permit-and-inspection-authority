import { NewLicenseForm } from "../../models/constructionRegulatory/constructionRegulatory.model.js";

const submitNewLicenseForm = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    const newForm = new NewLicenseForm({
      fullName: formData.fullName,
      gender: formData.gender,
      woreda: formData.woreda,
      mobilePhone: formData.mobilePhone,
      houseNumber: formData.houseNumber,
      kebele: formData.kebele,
      currentOrganization: formData.currentOrganization,
      idCard: null,
      educationEvidence: null,
      transcript: null,
      COC: null,
      applicantPhoto: null,
      workExperience: formData.workExperience,
      competencyCertification: null,
      businessLicense: null,
      contractAgreement: null,
      paymentDocument: null,
      performanceLetter: null,
      enterpriseArticles: null,
      byLaws: null,
      workExperiencePDF: null,
    });

    const fileFields = {
      "The manager of PLC or Enterprise member": [
        "idCard",
        "educationEvidence",
        "transcript",
        "COC",
        "applicantPhoto",
        "competencyCertification",
        "businessLicense",
        "contractAgreement",
        "paymentDocument",
        "performanceLetter",
        "enterpriseArticles",
        "byLaws",
      ],
      Employee: [
        "idCard",
        "educationEvidence",
        "transcript",
        "COC",
        "applicantPhoto",
        "workExperiencePDF",
      ],
      Freelancer: [
        "idCard",
        "educationEvidence",
        "transcript",
        "COC",
        "applicantPhoto",
      ],
    };

    const fieldsToSet = fileFields[formData.workExperience];
    if (fieldsToSet) {
      for (const field of fieldsToSet) {
        if (files[field]) {
          newForm[field] = {
            name: files[field][0].filename,
            path: files[field][0].path,
          };
        }
      }
    }
    try {
      await newForm.save();
    } catch (err) {
      res.status.json({ message: "Database error", "Error,": err });
    }
    return res.status(201).json({
      message: "New license form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const submitUpgradeLicenseForm = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    const newForm = new NewLicenseForm({
      fullName: formData.fullName,
      gender: formData.gender,
      woreda: formData.woreda,
      mobilePhone: formData.mobilePhone,
      houseNumber: formData.houseNumber,
      kebele: formData.kebele,
      currentOrganization: formData.currentOrganization,
      idCard: null,
      educationEvidence: null,
      transcript: null,
      COC: null,
      applicantPhoto: null,
      workExperience: formData.workExperience,
      competencyCertification: null,
      businessLicense: null,
      contractAgreement: null,
      paymentDocument: null,
      performanceLetter: null,
      enterpriseArticles: null,
      byLaws: null,
      workExperiencePDF: null,
      businessLicenseProprietor: null,
      testimonial: null,
      companyLicense: null,
    });

    const fileFields = {
      "The manager of PLC or Enterprise member": [
        "idCard",
        "educationEvidence",
        "transcript",
        "COC",
        "applicantPhoto",
        "competencyCertification",
        "businessLicense",
        "contractAgreement",
        "paymentDocument",
        "performanceLetter",
        "enterpriseArticles",
        "byLaws",
      ],
      Employee: [
        "idCard",
        "educationEvidence",
        "transcript",
        "COC",
        "applicantPhoto",
        "workExperiencePDF",
      ],
      Freelancer: [
        "idCard",
        "educationEvidence",
        "transcript",
        "COC",
        "applicantPhoto",
      ],
    };

    const fieldsToSet = fileFields[formData.workExperience];
    if (fieldsToSet) {
      for (const field of fieldsToSet) {
        if (files[field]) {
          newForm[field] = {
            name: files[field][0].filename,
            path: files[field][0].path,
          };
        }
      }
    }
    try {
      await newForm.save();
    } catch (err) {
      res.json({ message: "Database error", "Error,": err });
    }
    return res.status(201).json({
      message: "New license form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export { submitNewLicenseForm, submitUpgradeLicenseForm };
