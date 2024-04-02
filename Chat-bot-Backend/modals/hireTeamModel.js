const mongoose = require("mongoose");

const HireTeamSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  technologyHire: {
    type: String,
  },
  projectRequirements: {
    type: String,
  },
});
const HireTeam = mongoose.model("HireTeam", HireTeamSchema);
module.exports = HireTeam;
