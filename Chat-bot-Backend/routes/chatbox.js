const express = require("express");
const {
  firstQuestion,
  fourthQuestion,
  fifthQuestion,
  getStarted,
  UserInfoQuestion,
  SecondQuestion,
  thirdQuestion,
} = require("../controllers/chatbotController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    return callBack(null, "./upload/documentFile/");
  },
  filename: (req, file, callBack) => {
    return callBack(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
const { Uploadfile } = require("../controllers/uploadFile");
const { downloadFile } = require("../controllers/downloadFile");
const router = express.Router();
router.route("/getStarted").get(getStarted);
router.route("/userInfo").post(UserInfoQuestion);
router.route("/first-question").post(firstQuestion);
router.route("/second-question").post(SecondQuestion);
router.route("/third-question").post(thirdQuestion);
router.route("/fourth-question").post(fourthQuestion);
router.route("/fifth-question").post(fifthQuestion);
router.post("/uploadFile", upload.fields([{ name: "document" }]), Uploadfile);
router.get("/documentFile/:fileName", downloadFile);

module.exports = router;
