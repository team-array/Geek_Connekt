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
    fullName: {
        type: String,
        default: "",
    },
    website: {
        type: String,
        default: "",
    },
    birthDate: {
        type: Date,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    college: {
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
    location: {
        type: String,
        default: "India",
    },
    hometown: {
        type: String,
        default: "Hyderabad",
    },
    bio: {
        type: String,
        default: "Hola, I'm using Geek Connect 👋",
    },
    profilePic: {
        type: String,
        default:
            "https://res.cloudinary.com/geek-connekt/image/upload/v1637765287/profilePic_llsevw.png",
    },
    backgroundPic: {
        type: String,
        default:
            "https://res.cloudinary.com/geek-connekt/image/upload/v1637765536/backgroundPic_buqp8j.png",
    },
    birthDate: {
        type: Date,
    },
    secondarySchool: {
        type: String,
        default: "NaN",
    },
    primarySchool: {
        type: String,
        default: "NaN",
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    achievements: [
        {
            type:String,
        }
    ],
    savedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
});

UserSchema.methods.generateAuthToken = async function () {
    try {
        // console.log("Generating token for: ", this);
        const userToken = jwt.sign(
            {
                username: this.username.toString(),
                email: this.email.toString(),
                role: this.role.toString(),
                // rollNumber: this.rollNumber.toString(),
            },
            process.env.JWT_SECRET
        );
        // console.log("Token generated");
        if (this.tokens.length > 3) {
            this.tokens = [];
        }
        this.tokens.push({ token: userToken.toString() });
        await this.save();
        return userToken;
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongoose.model("User", UserSchema);
