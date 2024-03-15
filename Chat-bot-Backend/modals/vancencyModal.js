const mongoose = require("mongoose");

const vancencySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  selectedTech: {
    type: String,
    required: true,
  },
});
const InterviewModal = mongoose.model("Interviewer", vancencySchema);
module.exports = InterviewModal;
