const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = async (email, sendEmail, phoneNumber, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.User_Email,
        pass: process.env.User_Password,
      },
    });

    let mailOptions = {
      from: process.env.User_Email,
      to: sendEmail,
      subject: "For Verification Mail",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verified Email Template</title>
        <style>
          .main {
            background: lightgrey;
            line-height: 1.7em;
            font-family: "Montserrat", sans-serif;
            font-size: 20px;
            padding: 40px 0px;
          }
          .container {
            width: 60%;
            margin: 0 auto;
          }
          .container img {
            margin: 20px auto;
            display: block;
            width: 250px;
          }
          .email-content {
            background: #fff;
            padding: 35px;
            text-align: center;
          }
          .email-content h1 {
            font-size: 28px;
            margin-bottom: 10px;
          }
          .email-content h2 {
            font-weight: 400;
            margin: 30px;
          }
          .email-content h2 span {
            font-weight: 900;
          }
          .email-content p {
            margin: 5px;
          }
          .mb-30 {
            margin-bottom: 30px !important;
          }
          .mt-30 {
            margin-top: 30px !important;
          }
        </style>
      </head>
      <body>
        <div class="main">
          <div class="container">
            <div class="email-content">
              <h2 class="mt-30">${email}</h2>
              <h2 class="mt-30">${phoneNumber}</h2>
            </div>
          </div>
        </div>
      </body>
      </html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.sendStatus(401).send({
      status: false,
      message: error.message,
      data: null,
    });
  }
};
