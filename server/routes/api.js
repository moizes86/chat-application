var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
const Message = require("../models/message.model");

router.get("/users", async (req, res) => {
  const { query } = req.query;
  const reg = new RegExp(query, "gi");
  try {
    const users = await User.find({ username: { $regex: reg, $ne: "Admin" } });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const [details] = await User.find({ email });
    const messages = await Message.find({ "user.email": email });
    return res.status(200).json({ details, messages });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
