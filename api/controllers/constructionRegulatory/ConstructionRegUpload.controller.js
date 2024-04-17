const NewLicenseForm = require("../models/NewLicenseForm");
const RenewalForm = require("../models/RenewalForm");
const UpgradeForm = require("../models/UpgradeForm");

// Controller function to handle submission of new license form
const submitNewLicenseForm = async (req, res) => {
  try {
    const formData = req.body;
    // Create a new instance of the NewLicenseForm model with the form data
    const newLicense = new NewLicenseForm(formData);
    await newLicense.save();
    return res.status(201).json({
      message: "New license form submitted successfully",
      data: newLicense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to handle submission of renewal form
const submitRenewalForm = async (req, res) => {
  try {
    const formData = req.body;
    // Create a new instance of the RenewalForm model with the form data
    const renewal = new RenewalForm(formData);
    await renewal.save();
    return res
      .status(201)
      .json({ message: "Renewal form submitted successfully", data: renewal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to handle submission of upgrade form
const submitUpgradeForm = async (req, res) => {
  try {
    const formData = req.body;
    // Create a new instance of the UpgradeForm model with the form data
    const upgrade = new UpgradeForm(formData);
    await upgrade.save();
    return res
      .status(201)
      .json({ message: "Upgrade form submitted successfully", data: upgrade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  submitNewLicenseForm,
  submitRenewalForm,
  submitUpgradeForm,
};
