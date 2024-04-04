const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  applyForJob: {
    type: Boolean,
    default: false,
  },
  hireDedicatedTeam: {
    type: Boolean,
    default: false,
  },
});
const UserModal = mongoose.model("userInfo", UserSchema);
module.exports = UserModal;
