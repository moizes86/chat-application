var express = require("express");
var router = express.Router();
const User = require("../models/user.model");

router.get("/users", async (req, res) => {
  try {
      const [users] = await User.find({});
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
