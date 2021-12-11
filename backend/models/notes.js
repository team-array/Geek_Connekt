const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: String,
        required: true,
        ref: "user",
    },
    topicName: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
        unique: true,
    },
    thumbNail: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("notes", NotesSchema);
