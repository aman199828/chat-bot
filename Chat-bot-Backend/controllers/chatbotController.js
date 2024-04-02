const fs = require("fs");
const InterviewModal = require("../modals/vancencyModal");
const {
  vancencyFourthQuestions,
  PredefineQuestion,
  hireDedicatedTeamQuestions,
  getVacancyTechnologies,
} = require("../utils/utils");
const { sendMailMiddleware } = require("../middleware/emailSend/emailSend");
// Function to get predefined questions

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
const UserInfoQuestion = async (req, res) => {
  try {
    const userInfo = {
      email: req.body.email,
    };

    const viewerInfo = await InterviewModal.create(userInfo);
    res.status(200).json({
      status: true,
      data: viewerInfo,
      Question: "What are you primarily looking for, from us?",
      nextQuestion: PredefineQuestion,
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
const firstQuestion = async (req, res) => {
  const { selectedAnswer } = req.body;
  try {
    let response;
    switch (selectedAnswer) {
      case "Apply For Job":
        
        response = {
          status: true,
          question: getVacancyTechnologies,
        };
        break;
      case "Hire Dedicated Team":
        response = {
          status: true,
          question:hireDedicatedTeamQuestions,
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



const SecondQuestion = async (req, res) => {
  try {
    const { email, selectedAnswer } = req.body;

    await InterviewModal.updateOne(
      { email: email },
      { $set: { selectedTech: selectedAnswer } }
    );
    let response;
    switch (selectedAnswer) {
      case "Apply For Job":
        response = {
          status: true,
          question: getVacancyTechnologies,
        };
        break;
      case "Hire Dedicated Team":
        response = {
          status: true,
          question:hireDedicatedTeamQuestions,
        };
        break;
      default:
        response = {
          error: "Invalid selection",
        };
    }
    return res.status(200).json(response)
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
  
  getStarted,
  UserInfoQuestion,
  firstQuestion,
  SecondQuestion,
  fourthQuestion,
  fifthQuestion,
 
};
