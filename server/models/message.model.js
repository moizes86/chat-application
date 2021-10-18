const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("message", Message);
