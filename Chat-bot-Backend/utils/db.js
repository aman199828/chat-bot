const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amandhiman:" +
        process.env.MONGO_PASSWORD +
        "@cluster0.ewbpwdp.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to Mongo!");
  } catch (error) {
    console.error("Connected to Mongo Failed");
    throw error;
  }
};

module.exports = { connectToDatabase };
