const {
  PredefineQuestion,
  hireDedicatedTeamQuestions,
  getVacancyTechnologies,
  exprienceQuestions,
  trainingRelevantQuestions,
} = require("../utils/utils");
const { sendMailMiddleware } = require("../middleware/emailSend/emailSend");
const UserModal = require("../modals/user");
const vancencyModal = require("../modals/vancencyModal");
const HireTeam = require("../modals/hireTeamModel");
// Function to get predefined questions

const getStarted = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      showInput: true,
      placeholder: "Please Provide Your Email",
      type: "email",
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

    const viewerInfo = await UserModal.create(userInfo);
    res.status(200).json({
      status: true,
      data: viewerInfo,
      nextQuestion: PredefineQuestion,
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
const firstQuestion = async (req, res) => {
  const { selectedAnswer, userEamil } = req.body;
  const userInfo = await UserModal.findOne({ email: userEamil });
  try {
    let response;
    switch (selectedAnswer) {
      case "Apply For Job":
        const jobInfo = {
          email: userInfo.email,
        };
        await vancencyModal.create(jobInfo);
        await UserModal.updateOne(
          { email: userEamil },
          { $set: { applyForJob: true } }
        );
        response = {
          status: true,
          nextQuestion: getVacancyTechnologies,
        };
        break;
      case "Hire Dedicated Team":
        const hireTeamInfo = {
          email: userInfo.email,
        };
        await HireTeam.create(hireTeamInfo);
        await UserModal.updateOne(
          { email: userEamil },
          { $set: { hireDedicatedTeam: true } }
        );
        response = {
          status: true,
          nextQuestion: hireDedicatedTeamQuestions,
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
    const { userEamil, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEamil });
    if (userInfo.applyForJob) {
      await vancencyModal.updateOne(
        { email: userEamil },
        { $set: { selectedTech: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        nextQuestion: exprienceQuestions,
      });
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEamil },
        { $set: { technologyHire: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        showInput: true,
        type: "textArea",
        StartLine: " Perfect!",
        MidLine: `I see that you're interested in hiring a dedicated team with expertise in ${selectedAnswer}. Could you please provide more details about the project requirements that will be handled by this team? `,
      });
    } else {
      res.status(400).json({
        status: false,
        data: null,
        message: "Error While During selecting Answer",
      });
    }
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
const fourthQuestion = async (req, res) => {
  try {
    const { userEamil, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEamil });
    if (userInfo.applyForJob) {
      await InterviewModal.updateOne(
        { email: userEamil },
        { $set: { yearExp: selectedAnswer } }
      );
      if (yearExp == "Fresher") {
        res.status(200).json({
          status: true,
          nextQuestion: trainingRelevantQuestions,
        });
      } else {
        const sendEmail = "aman.dhiman@ensuesoft.com";
        await sendMailMiddleware(userEamil, sendEmail, res);
        res.status(200).json({
          status: true,
          message:
            "Thank you for your time. Our HR team will be in touch with you shortly.",
        });
      }
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEamil },
        { $set: { projectRequirements: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        showDocument: true,
        type: "textArea",
        StartLine: " Perfect!",
        MidLine:
          "Could you kindly provide the link to the demo website, Fegima, along with any other relevant documents?",
        EndLine:
          "Discover the innovative features of our demo website, accessible via the link provided below.",
      });
    } else {
      res.status(400).json({
        status: false,
        data: null,
        message: "Error While During selecting Answer",
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
    const { userEamil, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEamil });
    if (userInfo.applyForJob) {
      await InterviewModal.updateOne(
        { email: userEamil },
        { $set: { traning: selectedAnswer } }
      );

      const userInfo = await InterviewModal.findOne({ email: userEamil });
      const sendEmail = "aman.dhiman@ensuesoft.com";
      await sendMailMiddleware(email, sendEmail, userInfo.phoneNumber, res);
      res.status(200).json({
        status: true,
        message:
          "Thank you for your time. Our HR team will be in touch with you shortly.",
      });
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEamil },
        { $set: { technologyHire: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        showcalendar: true,
        type: "textArea",
        StartLine: "Perfect!",
        MidLine:
          "Would you like to schedule a meeting to discuss this further?",
      });
    } else {
      res.status(400).json({
        status: false,
        data: null,
        message: "Error While During selecting Answer",
      });
    }
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
const sixthQuestion = async (req, res) => {
  try {
    const { userEamil, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEamil });
    if (userInfo.applyForJob) {
      res.status(200).json({
        status: true,
        message: "Done Already",
      });
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEamil },
        { $set: { technologyHire: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        showReview: true,
        StartLine:
          "Thank you for your time. Our team will be in touch with you shortly.",
        MidLine:
          "We value your feedback. Please provide your review and suggestions for areas where we can enhance our offering.",
      });
    } else {
      res.status(400).json({
        status: false,
        data: null,
        message: "Error While During selecting Answer",
      });
    }
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
  sixthQuestion,
};
