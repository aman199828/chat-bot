const {
  PredefineQuestion,
  hireDedicatedTeamQuestions,
  getVacancyTechnologies,
  exprienceQuestions,
  trainingRelevantQuestions,
  nextHireTeam,
  endQuestions,
  linkOption,
  meetingQuestions,
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
      inputType: "email",
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
      StartLine: "What are you primarily looking for, from us?",
      MidLine: "",
      EndLine: "",
      nextQuestion: PredefineQuestion,
    });
  } catch (error) {
    // Handle errors
    // console.error("Error getting predefined questions:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
const firstQuestion = async (req, res) => {
  const { selectedAnswer, userEmail } = req.body;
  const userInfo = await UserModal.findOne({ email: userEmail });
  try {
    let response;
    switch (selectedAnswer) {
      case "Apply For Job":
        const jobInfo = {
          email: userInfo.email,
        };
        await vancencyModal.create(jobInfo);
        await UserModal.updateOne(
          { email: userEmail },
          { $set: { applyForJob: true } }
        );
        response = {
          status: true,
          StartLine: "What specific technologies do you typically work",
          MidLine: "",
          EndLine: "",
          nextQuestion: getVacancyTechnologies,
        };
        break;
      case "Hire Dedicated Team":
        const hireTeamInfo = {
          email: userInfo.email,
        };
        await HireTeam.create(hireTeamInfo);
        await UserModal.updateOne(
          { email: userEmail },
          { $set: { hireDedicatedTeam: true } }
        );
        response = {
          status: true,
          StartLine:
            "Can you tell me a little more about what kind of expertise or technology you'll want to hire for your project?",
          MidLine: "",
          EndLine: "",
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
    const { userEmail, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEmail });

    if (userInfo.applyForJob) {
      await vancencyModal.updateOne(
        { email: userEmail },
        { $set: { selectedTech: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        StartLine: "How many years of exprience do you have",
        MidLine: "",
        EndLine: "",
        nextQuestion: exprienceQuestions,
      });
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEmail },
        { $set: { technologyHire: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        StartLine: " Perfect!",
        MidLine: `I see that you're interested in hiring a dedicated team with expertise in ${selectedAnswer}. Could you please provide more details about the project requirements that will be handled by this team? `,
        EndLine: "",
        nextQuestion: nextHireTeam,
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
const thirdQuestion = async (req, res) => {
  try {
    const { userEmail, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEmail });
    if (userInfo.applyForJob) {
      await InterviewModal.updateOne(
        { email: userEmail },
        { $set: { yearExp: selectedAnswer } }
      );
      if (yearExp == "Fresher") {
        res.status(200).json({
          status: true,
          StartLine:
            "Have you completed any training relevant to this position?",
          MidLine: "",
          EndLine: "",
          nextQuestion: trainingRelevantQuestions,
        });
      } else {
        const sendEmail = "aman.dhiman@ensuesoft.com";
        await sendMailMiddleware(userEmail, sendEmail, res);
        res.status(200).json({
          status: true,
          StartLine:
            "Thank you for your time. Our HR team will be in touch with you shortly.",
          MidLine: "",
          EndLine: "",
          nextQuestion: endQuestions,
        });
      }
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEmail },
        { $set: { projectRequirements: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        StartLine: "Perfect!",
        MidLine:
          "Could you kindly provide the link to the demo website, Fegima, along with any other relevant documents?",
        EndLine:
          "Discover the innovative features of our demo website, accessible via the link provided below.",
        nextQuestion: linkOption,
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
    const { userEmail, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEmail });
    if (userInfo.applyForJob) {
      await InterviewModal.updateOne(
        { email: userEmail },
        { $set: { traning: selectedAnswer } }
      );

      const userInfo = await InterviewModal.findOne({ email: userEmail });
      const sendEmail = "aman.dhiman@ensuesoft.com";
      await sendMailMiddleware(email, sendEmail, userInfo.phoneNumber, res);
      res.status(200).json({
        status: true,
        StartLine:
          "Thank you for your time. Our HR team will be in touch with you shortly.",
        MidLine: "",
        EndLine: "",
        nextQuestion: endQuestions,
      });
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEmail },
        { $set: { technologyHire: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        showcalendar: true,
        type: "textArea",
        StartLine: "Perfect!",
        MidLine:
          "Would you like to schedule a meeting to discuss this further?",
        EndLine: "",
        nextQuestion: meetingQuestions,
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
    const { userEmail, selectedAnswer } = req.body;
    const userInfo = await UserModal.findOne({ email: userEmail });
    if (userInfo.applyForJob) {
      res.status(200).json({
        status: true,
        message: "Done Already",
      });
    } else if (userInfo.hireDedicatedTeam) {
      await HireTeam.updateOne(
        { email: userEmail },
        { $set: { technologyHire: selectedAnswer } }
      );
      res.status(200).json({
        status: true,
        showReview: true,
        StartLine:
          "Thank you for your time. Our team will be in touch with you shortly",
        MidLine: "",
        EndLine: "",
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
  thirdQuestion,
  fourthQuestion,
  fifthQuestion,
};
