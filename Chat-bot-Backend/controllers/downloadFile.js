const path = require("path");
const fs = require("fs");
const { getContentType } = require("../utils/utils");

exports.downloadFile = (req, res) => {
  try {
    const FileName = req.params.fileName;
    const directoryPath = "./upload/documentFile";
    const filePath = path.join(directoryPath, FileName);

    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        return res.status(200).send({
          data: null,
        });
      } else {
        const fileStream = fs.createReadStream(filePath);

        // Set appropriate Content-Type header based on the file extension
        const ext = path.extname(filePath);
        const contentType = getContentType(ext);
        res.set("Content-Type", contentType);

        fileStream.pipe(res);
      }
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};
