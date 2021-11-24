const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    password: {
        type: String,
        required: true,
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
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    role: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
    },
});

UserSchema.methods.generateAuthToken = async function () {
    try {
        // console.log("Generating token for: ", this);
        const userToken = jwt.sign(
            {
                username: this.username.toString(),
                email: this.email.toString(),
                role: this.role.toString(),
                rollNumber: this.rollNumber.toString(),
            },
            process.env.JWT_SCRECT
        );
        // console.log("Token generated");
        this.tokens.push({ token: userToken.toString() });
        await this.save();
        return userToken;
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongoose.model("User", UserSchema);
