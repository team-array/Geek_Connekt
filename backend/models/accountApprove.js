const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const Schema = mongoose.Schema;

const AccountApprovalSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (value.length < 4) {
                throw new Error("Username must be atleast 4 characters long!");
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter a valid email address!");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("AccountApprove", AccountApprovalSchema);
