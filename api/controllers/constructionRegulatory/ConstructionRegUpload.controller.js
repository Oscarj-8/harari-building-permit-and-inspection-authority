import NewLicenseForm from "../../models/constructionRegulatory/constructionRegulatory.model.js";

const submitNewLicenseForm = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const idCard = req.files.idCard[0];
    const educationEvidence = req.files.educationEvidence[0];
    const transcript = req.files.transcript[0];
    const COC = req.files.COC[0];
    const applicantPhoto = req.files.applicantPhoto[0];

    console.log(idCard.filename);

    const newForm = new NewLicenseForm({
      fullName: formData.fullName,
      gender: formData.gender,
      woreda: formData.woreda,
      mobilePhone: formData.mobilePhone,
      houseNumber: formData.houseNumber,
      subCity: formData.subCity,
      currentOrganization: formData.currentOrganization,
      idCard: {
        name: idCard.filename,
        path: idCard.path,
      },
      educationEvidence: {
        name: educationEvidence.filename,
        path: educationEvidence.path,
      },
      transcript: {
        name: transcript.filename,
        path: transcript.path,
      },
      COC: {
        name: COC.filename,
        path: COC.path,
      },
      applicantPhoto: {
        name: applicantPhoto.filename,
        path: applicantPhoto.path,
      },
      workExperience: formData.workExperience,
    });

    // Save the new document to the database
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
// // Controller function to handle submission of renewal form
// const submitRenewalForm = async (req, res) => {
//   try {
//     const formData = req.body;
//     // Create a new instance of the RenewalForm model with the form data
//     const renewal = new RenewalForm(formData);
//     await renewal.save();
//     return res
//       .status(201)
//       .json({ message: "Renewal form submitted successfully", data: renewal });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Controller function to handle submission of upgrade form
// const submitUpgradeForm = async (req, res) => {
//   try {
//     const formData = req.body;
//     // Create a new instance of the UpgradeForm model with the form data
//     const upgrade = new UpgradeForm(formData);
//     await upgrade.save();
//     return res
//       .status(201)
//       .json({ message: "Upgrade form submitted successfully", data: upgrade });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// module.exports = {
//   submitNewLicenseForm,
//   submitRenewalForm,
//   submitUpgradeForm,
// };
export { submitNewLicenseForm };
