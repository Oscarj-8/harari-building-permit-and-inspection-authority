import newLicenseFormModel from "../../models/constructionRegulatory/constructionRegulatory.model.js";
// const RenewalForm = require("../models/RenewalForm");
// const UpgradeForm = require("../models/UpgradeForm");

// Controller function to handle submission of new license form
const submitNewLicenseForm = async (req, res) => {
  try {
    const values = req.body;
    console.log(values); // Log form data received by the backend

    return res.status(201).json({
      message: "New license form submitted successfully",
      data: values, // Return form data in the response
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
