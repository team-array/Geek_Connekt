const { cloudinary } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
const AccountApprove = require("../models/accountApprove.js");
const verify = require("../middlewares/verifyuser").verifyuser;
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API);


exports.getAllRequests = async (req, res) => {
    try {
        const requests = await AccountApprove.find({});
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.approveAccount = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, username, phoneNumber, rollNumber } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            email,
            password,
            username,
            phoneNumber,
            rollNumber,
            role: "student",
            college: "CMRCET",
        });
        newUser.save();
        await AccountApprove.findOneAndDelete({ email });
        await sgMail.send({
            to: email.toString(),
            from: "geekconnekt@gmail.com",
            subject: "Welcome to Geek Connekt!",
            html: `<div>Your now verified user of geek_connekt.please login with your creadentials</div>`,
        });
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
