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

const router = express.Router();
router.route("/getStarted").get(getStarted);
router.route("/userInfo").post(UserInfoQuestion);
router.route("/first-question").post(firstQuestion);
router.route("/second-question").post(SecondQuestion);
router.route("/third-question").post(thirdQuestion);
router.route("/fourth-question").post(fourthQuestion);
router.route("/fifth-question").post(fifthQuestion);

module.exports = router;
