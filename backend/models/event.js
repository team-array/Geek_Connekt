const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true,
        trim: true
    },
    EventSubtitle: {
        type: String,
    },
    EventDescription: {
        type: String,
        required: true,
    },
    EventLink: {
        type: String,
        default:"",
    },
    EventDate: {
        type: Date,
        required: true,
    },
    addedBy: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Event", EventSchema);
