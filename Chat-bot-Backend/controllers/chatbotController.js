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
const getStarted = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      showInput: true,
      StartLine: "Great! Nice to meet you 👍",
      MidLine: "Could you share your email with us? ",
      EndLine: "Don't worry, we're not in the business of sending spam.",
    });
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const firstQuestion = async (req, res) => {
  const { selectedAnswer } = req.body;
  try {
    let response;
    switch (selectedAnswer) {
      case "I have question about vancency":
        response = {
          status: true,
          question:
            "Please provide your email and phone number regarding the vacancy.",
        };
        break;
      case "I have question about my invoice":
        response = {
          status: true,
          question:
            "Please provide your invoice details so we can assist you better.",
        };
        break;
      case "I have question about support":
        response = {
          status: true,
          question: "Please describe your support issue in detail.",
        };
        break;
      case "I am developer trying to learn more":
        response = {
          status: true,
          question:
            "What specific topics are you interested in learning about?",
        };
        break;
      case "I have question about designing":
        response = {
          status: true,
          question: "Please specify the design-related query you have.",
        };
        break;
      case "Something else":
        response = {
          status: true,
          question: "Please provide details about your query.",
        };
        break;
      default:
        response = {
          error: "Invalid selection",
        };
    }
    return res.status(200).json(response);
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
  getStarted,
};
