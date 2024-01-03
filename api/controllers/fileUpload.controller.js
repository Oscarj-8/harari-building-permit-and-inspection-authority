import FileModel from "../models/file.model.js";

const uploadFile = async (req, res) => {
  try {
    const newFile = new FileModel({
      name: req.file.originalname,
      path: req.file.path,
    });
    await newFile.save();

    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

export default uploadFile;
