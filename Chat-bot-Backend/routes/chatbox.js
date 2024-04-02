const express = require("express");
const {
  firstQuestion,
  threeQuestion,
  fourthQuestion,
  fifthQuestion,
  getStarted,
  UserInfoQuestion,
} = require("../controllers/chatbotController");

const router = express.Router();
router.route("/getStarted").get(getStarted);
router.route("/userInfo").post(UserInfoQuestion);
router.route("/first-question").post(firstQuestion);
router.route("/third-question").post(threeQuestion);
router.route("/fourth-question").post(fourthQuestion);
router.route("/fifth-question").post(fifthQuestion);

module.exports = router;
