const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", PostSchema);
