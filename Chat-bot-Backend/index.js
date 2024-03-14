const express = require("express");
const { connectToDatabase } = require("./utils/db");
require("dotenv").config();
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const port = 3030;
app.use(express.json());
// for parsing application/json

//MongoDb setup
connectToDatabase();

//Passport-jwt setup

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
