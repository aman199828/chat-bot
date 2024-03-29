const mongoose = require("mongoose");

const vancencySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  selectedTech: {
    type: String,
  },
  yearExp: {
    type: String,
  },
  traning: {
    type: String,
  },
});
const InterviewModal = mongoose.model("Interviewer", vancencySchema);
module.exports = InterviewModal;
