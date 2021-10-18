var express = require("express");
var router = express.Router();
const { upload } = require("../utils/multer");
const User = require("../models/user.model");
const { generateHash } = require("../utils/bcrypt");
const { emailer } = require("../utils/emailer");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await User.find({ email });
    if (!user) throw Error("User does not exist");
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) throw Error("Passwords do not match");
    if (!user.verified)
      return res.status(400).json({ message: "Account is not verified", needsVerification: true });
    return res.status(200).json({ message:'Login successful!', user: { email: user.email, username: user.username } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post("/signup", upload.single("profilePic"), async function (req, res, next) {
  const { email, username, password } = req.body;
  const profilePic = req.file?.path || "";
  const hash = await generateHash(password);
  const verificationCode = Math.floor(Math.random() * (999999 - 100000) + 100000);
  req.body.verificationCode = verificationCode;
  const instance = new User({
    email,
    username,
    password: hash,
    profilePic,
    verificationCode,
  });

  try {

    await instance.save();
    await emailer(email, req.body.verificationCode).catch((err) => console.log(err));

    return res.status(200).json({ message: "Signup Successful!", payload: { email, username, profilePic } });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "Email already exists. Try different one." });
    return res.status(400).json({ message: "Error signing up. Try again later." });
  }
});

router.get("/emailer/:email", async (req, res, next) => {
  const { email } = req.params;
  let verificationCode;

  try {
    const [user] = await User.find({ email });
    if (user) {
      verificationCode = user.verificationCode;
    } else {
      throw Error("User does not exists.");
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  try {
    await emailer(email, verificationCode);
    return res.status(200).json({ message: "Verification code sent. Check your email" });
  } catch (err) {
    return res.status(400).json({ message: "Error sending email. Try again later." });
  }
});

router.post("/verify-account", async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const [user] = await User.find({ email });
    if (!user) throw Error("User does not exists");
    if (user.verificationCode === +verificationCode) {
      const user = await User.findOne({ email });
      user.verified = true;
      await user.save();
      return res.status(200).json({ message: "User authenticated! Your acoount is now active" });
    } else {
      return res.status(401).json({ message: "Verification code does not match.", sendEmailAgain: true });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message, sendEmailAgain: false });
  }
});

module.exports = router;
