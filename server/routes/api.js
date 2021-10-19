var express = require("express");
var router = express.Router();
const User = require("../models/user.model");

router.get("/users", async (req, res) => {
  const { query } = req.query;
  const reg = new RegExp(query,"gi")

  try {
    const users = await User.find({ username: { $regex: reg, $ne: "Admin" } });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
