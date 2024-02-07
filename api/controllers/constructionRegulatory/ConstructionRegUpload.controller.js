import fs from "fs";
import path from "path";

export const formUpload = (req, res) => {
  const formdata = req.body;
  const username = formdata.username;
  const userDirectory = path.join(
    process.cwd(),
    "api/constructionRegulatoryFolder",
    username
  );
  if (!fs.existsSync(userDirectory)) {
    fs.mkdirSync(userDirectory, { recursive: true });
  }

  const filePath = path.join(userDirectory, "form_data.txt");

  const formdataString = JSON.stringify(formdata, null, 2);

  fs.appendFile(filePath, formdataString + "\n", (err) => {
    if (err) {
      console.log("Error writing to file:", err);
      res.status(500).send("Error saving txt file");
    } else {
      console.log("Form data saved to file:", filePath);
      res.status(200).send({ message: "Form data saved" });
    }
  });
};
