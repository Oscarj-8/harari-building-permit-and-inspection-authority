// import NewLicenseForm from "../../models/constructionRegulatory/constructionRegulatory.model.js";

// const submitNewLicenseForm = async (req, res) => {
//   try {
//     const formData = req.body;
//     const idCard = req.files.idCard[0];
//     const educationEvidence = req.files.educationEvidence[0];
//     const transcript = req.files.transcript[0];
//     const COC = req.files.COC[0];
//     const applicantPhoto = req.files.applicantPhoto[0];
//     const competencyCertification = req.files.competencyCertification[0];
//     const businessLicense = req.files.businessLicense[0];
//     const contractAgreement = req.files.contractAgreement[0];
//     const paymentDocument = req.files.paymentDocument[0];
//     const performanceLetter = req.files.performanceLetter[0];
//     const enterpriseArticles = req.files.enterpriseArticles[0];
//     const byLaws = req.files.byLaws[0];
//     // const workExperiencePDF = req.files.workExperiencePDF[0];

//     const newForm = new NewLicenseForm({
//       fullName: formData.fullName,
//       gender: formData.gender,
//       woreda: formData.woreda,
//       mobilePhone: formData.mobilePhone,
//       houseNumber: formData.houseNumber,
//       kebele: formData.kebele,
//       currentOrganization: formData.currentOrganization,
//       idCard: {
//         name: idCard.filename,
//         path: idCard.path,
//       },
//       educationEvidence: {
//         name: educationEvidence.filename,
//         path: educationEvidence.path,
//       },
//       transcript: {
//         name: transcript.filename,
//         path: transcript.path,
//       },
//       COC: {
//         name: COC.filename,
//         path: COC.path,
//       },
//       applicantPhoto: {
//         name: applicantPhoto.filename,
//         path: applicantPhoto.path,
//       },
//       workExperience: formData.workExperience,
//       competencyCertification: {
//         name: competencyCertification.filename,
//         path: competencyCertification.path,
//       },
//       businessLicense: {
//         name: businessLicense.filename,
//         path: businessLicense.path,
//       },
//       contractAgreement: {
//         name: contractAgreement.filename,
//         path: contractAgreement.path,
//       },
//       paymentDocument: {
//         name: paymentDocument.filename,
//         path: paymentDocument.path,
//       },
//       performanceLetter: {
//         name: performanceLetter.filename,
//         path: performanceLetter.path,
//       },
//       enterpriseArticles: {
//         name: enterpriseArticles.filename,
//         path: enterpriseArticles.path,
//       },
//       byLaws: {
//         name: byLaws.filename,
//         path: byLaws.path,
//       },
//     });

//     try {
//       await newForm.save();
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ message: "Database error." });
//     }

//     return res.status(201).json({
//       message: "New license form submitted successfully",
//       data: newForm,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // // Controller function to handle submission of renewal form
// // const submitRenewalForm = async (req, res) => {
// //   try {
// //     const formData = req.body;
// //     // Create a new instance of the RenewalForm model with the form data
// //     const renewal = new RenewalForm(formData);
// //     await renewal.save();
// //     return res
// //       .status(201)
// //       .json({ message: "Renewal form submitted successfully", data: renewal });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // // Controller function to handle submission of upgrade form
// // const submitUpgradeForm = async (req, res) => {
// //   try {
// //     const formData = req.body;
// //     // Create a new instance of the UpgradeForm model with the form data
// //     const upgrade = new UpgradeForm(formData);
// //     await upgrade.save();
// //     return res
// //       .status(201)
// //       .json({ message: "Upgrade form submitted successfully", data: upgrade });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // module.exports = {
// //   submitNewLicenseForm,
// //   submitRenewalForm,
// //   submitUpgradeForm,
// // };
// export { submitNewLicenseForm };

import NewLicenseForm from "../../models/constructionRegulatory/constructionRegulatory.model.js";

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
      Unemployed: [
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

    await newForm.save();

    return res.status(201).json({
      message: "New license form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// module.exports = {
//   submitNewLicenseForm,
//   submitRenewalForm,
//   submitUpgradeForm,
// };
export { submitNewLicenseForm };
