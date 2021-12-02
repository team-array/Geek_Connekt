const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  postedOn:{
    type: Date,
    default: Date.now
  },
  postedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("news", NewsSchema);
