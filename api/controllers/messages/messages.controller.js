import fs from "fs";
import path from "path";

const currentDir = new URL(".", import.meta.url).pathname;
const MESSAGES_FOLDER = path.join(currentDir, "..", "..", "messagesFolder");

const handleMessages = (req, res) => {
  try {
    const { name, number, message } = req.body;

    const timestamp = Date.now();

    const messageFolder = path.join(MESSAGES_FOLDER, String(timestamp));
    fs.mkdirSync(messageFolder, { recursive: true });

    const messageFilePath = path.join(messageFolder, "message.txt");
    fs.writeFileSync(
      messageFilePath,
      `Name: ${name}\nNumber: ${number}\nMessage: ${message}`
    );

    res
      .status(200)
      .json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
};

export default handleMessages;
