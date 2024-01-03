import FileModel from "../models/file.model.js";

const getAllFiles = async (req, res) => {
  try {
    const files = await FileModel.find({}, { name: 1, _id: 1 }); // Fetch only name and _id fields
    res.json({ files });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching files", error: error.message });
  }
};

export default getAllFiles;
