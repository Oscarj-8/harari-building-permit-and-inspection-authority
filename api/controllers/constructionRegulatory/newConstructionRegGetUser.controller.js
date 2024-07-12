import { NewLicenseForm } from "../../models/constructionRegulatory/constructionRegulatory.model.js";

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await NewLicenseForm.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default getUserById;
