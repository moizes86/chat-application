const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// async..await is not allowed in global scope, must use a wrapper
async function emailer(email, randomCode) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAILER_USER,
      pass: process.env.EMAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "No Reply <noreply@chatapp.com>",
    to: email,
    subject: "Verify Your Account",
    html: `<p>Hey there, please verify your account before moving on. Your code is ${randomCode} </p>`,
  };

  let info = await transporter.sendMail(mailOptions);

  if (!info.rejected.length) {
    return true;
  } else {
    throw Error;
  }
}

module.exports = {
  emailer,
};
