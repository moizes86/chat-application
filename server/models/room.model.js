const mongoose = require("mongoose");

const Room = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("room", Room);
