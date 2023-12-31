import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  originalName: String,
  path: String,
});

const File = mongoose.model("File", fileSchema);

export default File;
