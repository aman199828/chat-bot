const fs = require("fs");
const InterviewModal = require("../modals/vancencyModal");
const {
  vancencySecondQuestions,
  vancencyThirdQuestions,
  vancencyFourthQuestions,
  PredefineQuestion,
} = require("../utils/utils");
const { sendMailMiddleware } = require("../middleware/emailSend/emailSend");
// Function to get predefined questions
const getPredefinedQuestions = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      data: PredefineQuestion,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const firstQuestion = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      showInput: true,
      question: "Please provide your email and phone number to connect you",
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
      nextQuestion: vancencySecondQuestions,
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
      nextQuestion: vancencyThirdQuestions,
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
        nextQuestion: vancencyFourthQuestions,
      });
    } else {
      const sendEmail = "aman.dhiman@ensuesoft.com";
      await sendMailMiddleware(email, sendEmail, userInfo.phoneNumber, res);
      res.status(200).json({
        status: true,
        message:
          "Thank you for your time. Our HR team will be in touch with you shortly.",
      });
    }
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
  firstQuestion,
  secondQuestion,
  threeQuestion,
  fourthQuestion,
  fifthQuestion,
};
