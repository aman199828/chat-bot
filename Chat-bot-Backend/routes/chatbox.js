const express = require("express");
const {
  getPredefinedQuestions,
  findQuestion,
  secondQuestion,
  threeQuestion,
} = require("../controllers/chatbotController");

const router = express.Router();

router.route("/first-question").get(getPredefinedQuestions).post(findQuestion);
router.route("/second-question").post(secondQuestion);
router.route("/third-question").post(threeQuestion);

module.exports = router;
