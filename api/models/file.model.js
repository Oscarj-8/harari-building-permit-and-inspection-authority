const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  chunkSize: Number, // Optional for GridFS configuration
});

module.exports = mongoose.model("File", fileSchema);
