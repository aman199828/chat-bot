const fs = require("fs");
const path = require("path");
const InterviewModal = require("../modals/vancencyModal");
const {
  nextQuestions,
  threeQuestions,
  FourthQuestions,
} = require("../utils/utils");
const { sendMailMiddleware } = require("../middleware/emailSend/emailSend");
// Construct the file path to Questions.json
const filePath = path.join(__dirname, "../utils/Questions.json");
// Read predefined questions from JSON file
const allPredefinedQuestions = JSON.parse(fs.readFileSync(filePath));

// Function to get predefined questions
const getPredefinedQuestions = async (req, res) => {
  try {
    // Send JSON response with status 200
    res.status(200).json({
      status: true,
      data: allPredefinedQuestions,
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const findQuestion = async (req, res) => {
  try {
    const findAnwser = allPredefinedQuestions.find(
      (question) => question.id === req.body.id
    );

    return res.status(200).json({
      status: true,
      showInput: true,
      message: "Please provide your email and phone number to connect you",
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const secondQuestion = async (req, res) => {
  try {
    const userInfo = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

    const interviewer = await InterviewModal.create(userInfo);
    res.status(200).json({
      status: true,
      data: interviewer,
      nextQuestion: nextQuestions,
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const threeQuestion = async (req, res) => {
  try {
    const { email, selectedTech } = req.body;

    await InterviewModal.updateOne(
      { email: email },
      { $set: { selectedTech: selectedTech } }
    );
    res.status(200).json({
      status: true,
      nextQuestion: threeQuestions,
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
const fourthQuestion = async (req, res) => {
  try {
    const { email, yearExp } = req.body;
    await InterviewModal.updateOne(
      { email: email },
      { $set: { yearExp: yearExp } }
    );
    const userInfo = await InterviewModal.findOne({ email: email });
    if (yearExp == "Fresher") {
      res.status(200).json({
        status: true,
        nextQuestion: FourthQuestions,
      });
    }
    const sendEmail = "aman.dhiman@ensuesoft.com";
    await sendMailMiddleware(email, sendEmail, userInfo.phoneNumber, res);
    res.status(200).json({
      status: true,
      message:
        "Thank you for your time. Our HR team will be in touch with you shortly.",
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
const fifthQuestion = async (req, res) => {
  try {
    const { email, traning } = req.body;

    await InterviewModal.updateOne(
      { email: email },
      { $set: { traning: traning } }
    );

    const userInfo = await InterviewModal.findOne({ email: email });
    const sendEmail = "aman.dhiman@ensuesoft.com";
    await sendMailMiddleware(email, sendEmail, userInfo.phoneNumber, res);
    res.status(200).json({
      status: true,
      message:
        "Thank you for your time. Our HR team will be in touch with you shortly.",
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getPredefinedQuestions,
  findQuestion,
  secondQuestion,
  threeQuestion,
  fourthQuestion,
  fifthQuestion,
};
