const fs = require("fs");
require("dotenv").config();
const Uploadfile = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "No Track provided" });
    }
    const file = req.files["document"][0];
    return res.json({
      message: "Track uploaded and saved successfully.",
      filePath:
        process.env.BACKEND_BASEURL + "/chatbot/documentFile/" + file.filename,
      fileName: file.filename,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      data: null,
      message: "Problem in Upload the File",
      status: false,
    });
  }
};

module.exports = { Uploadfile };
