const express = require("express");
const {
  getPredefinedQuestions,
  findQuestion,
  secondQuestion,
  threeQuestion,
  fourthQuestion,
  fifthQuestion,
} = require("../controllers/chatbotController");

const router = express.Router();

router.route("/first-question").get(getPredefinedQuestions).post(findQuestion);
router.route("/second-question").post(secondQuestion);
router.route("/third-question").post(threeQuestion);
router.route("/fourth-question").post(fourthQuestion);
router.route("/fifth-question").post(fifthQuestion);

module.exports = router;
