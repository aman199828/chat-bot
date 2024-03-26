const express = require("express");
const {
  getPredefinedQuestions,
  firstQuestion,
  secondQuestion,
  threeQuestion,
  fourthQuestion,
  fifthQuestion,
} = require("../controllers/chatbotController");

const router = express.Router();

router.route("/preDefine-question").get(getPredefinedQuestions);
router.route("/first-question").post(firstQuestion);
router.route("/second-question").post(secondQuestion);
router.route("/third-question").post(threeQuestion);
router.route("/fourth-question").post(fourthQuestion);
router.route("/fifth-question").post(fifthQuestion);

module.exports = router;
