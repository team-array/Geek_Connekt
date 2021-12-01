const mongoose = require("mongoose");

const UtilitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  websitelink: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
  rating: [
    {
      username: {
        type: String,
        required: true,
        unique: true
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  addedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("utility", UtilitySchema);
