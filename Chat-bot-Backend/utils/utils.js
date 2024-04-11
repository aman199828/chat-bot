exports.PredefineQuestion = {
  answer: ["Apply For Job", "Hire Dedicated Team"],
};
// Job Related Question
exports.getVacancyTechnologies = {
  answer: [
    "Nodejs Developer",
    "React Developer",
    "UX/UI Designer",
    "ASP.NET Developer",
    "Business Development Executive(BDE)",
  ],
};
exports.exprienceQuestions = {
  answer: ["Fresher", "1 Year", "2 Year", "Above 2 year"],
};
exports.trainingRelevantQuestions = {
  answer: ["yes", "no"],
};

// Hire Dedicated team  Related Question
exports.hireDedicatedTeamQuestions = {
  type: "textArea",
  placeHolder: "example Reactjs, MernStack Dev etc ",
  showTextArea: true,
};
exports.nextHireTeam = {
  showTextArea: true,
  type: "textArea",
  placeHolder: "like full Details of project",
  answer: [],
};
exports.endQuestions = {
  answer: [],
};
exports.linkOption = {
  answer: [],
  type: "Document",
  showUploadBox: true,
};
exports.meetingQuestions = {
  showCalander: true,
  answer: ["Yes", "No"],
};

// Perfect!
// Hello Aman, I see that you're interested in hiring a dedicated team with expertise in ReactJS. Could you please provide more details about the project requirements that will be handled by this team?
// We value your feedback. Please provide your review and suggestions for areas where we can enhance our offering.

exports.getContentType = (ext) => {
  switch (ext.toLowerCase()) {
    case ".pdf":
      return "application/pdf";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".mp3":
      return "audio/mpeg"; // MIME type for mp3 audio files
    case ".txt":
      return "text/plain";
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".json":
      return "application/json";
    case ".xml":
      return "application/xml";
    case ".doc":
      return "application/msword";
    // Add more cases for other file types as needed
    default:
      return "application/octet-stream"; // Fallback to binary data
  }
};
