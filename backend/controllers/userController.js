const { cloudinary } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
const AccountApprove = require("../models/accountApprove.js");
const verify = require("../middlewares/verifyuser").verifyuser;
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const path = require("path");

console.log(process.env.SENDGRID_API);

sgMail.setApiKey(process.env.SENDGRID_API);

exports.userAuth = async (req, res, next) => {
    try {
        console.log(req.query);
        const { username } = jwt.verify(
            req.query.token,
            process.env.JWT_SECRET
        );
        console.log(username);
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({
                message: "User not found",
            });
        }
        // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // const { _id, name, email, role, avatar } = user;
        return res.status(200).json({
            msg: "success",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.rootUserLogin = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email, admin: true });
        if (!user) {
            return res.json({
                message: "You are not a valid user",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                message: "Invalid password",
            });
        }
        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET
        );
        // const { _id, name, email, role, avatar } = user;
        return res.status(200).json({
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        console.log(user);
        if (user===null) {
            return res.json({
                message: "Your Email is not registered",
            });
        }
        console.log("SENDING EMAIL TO: ", user.email);
        const userToken = jwt.sign(
            {
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET
        );
        const res = await sgMail.send({
            to: user.email,
            from: "geekconnekt@gmail.com",
            subject: "Change PassWord!",
            html: `<div><h1>Change Password Request!</h1><p>Click the Below link to change the password of your account</p><br/><br/><br/><a href=http://localhost:8000/changeUserPass/${userToken}>Change Password</a></div>`,
        });
        console.log("Email res: ", res);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.changeUserPass = async (req, res, next) => {
    // console.log(path.join(__dirname, "../../views/passChange.html"));
    res.sendFile(path.join(__dirname, "../views/passChange.html"));
};

exports.updatePass = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { password } = req.body;
        const { username } = jwt.verify(req.body.token, process.env.JWT_SECRET);
        console.log(username);
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.json({
                message: "User not found",
            });
        }
        user.password = bcrypt.hashSync(password, 10);
        await user.save();
        return res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.signUpUser = async (req, res, next) => {
    console.log(req.body);
    try {
        let { email, username, password, phoneNumber, rollNumber } = req.body;
        email = email.trim();
        username = username.trim();
        password = password.trim();
        phoneNumber = phoneNumber.trim();
        rollNumber = rollNumber.trim();
        const existingUserName = await User.findOne({
            username: username,
        });
        const existingEmailName = await User.findOne({
            email: email,
        });
        //console.log(existingUserName);
        if (existingUserName) {
            console.log(" post Username is already taken");
            res.json({ status: "error", msg: "Username is already taken" });
        }
        //console.log(existingUserName);
        else if (existingEmailName) {
            console.log(" post Username is already taken");
            res.send({ status: "error", msg: "Email is already taken" });
        } else {
            const userToken = jwt.sign(
                {
                    email: email.toString(),
                    username: username.toString(),
                    password: password.toString(),
                    phoneNumber: phoneNumber.toString(),
                    rollNumber: rollNumber.toString(),
                },
                process.env.JWT_SECRET
            );
            console.log("SENDING EMAIL TO: ", email);
            try {
                const res = await sgMail.send({
                    to: email.toString(),
                    from: "geekconnekt@gmail.com",
                    subject: "Verify your account!",
                    html: `<div><h1>Please Verify you Account!</h1><p>Click the Below link to verify your account</p><br/><br/><br/><a href=http://localhost:8000/verifySignUp/${userToken}>Verifiy Your Email</a></div>`,
                });
                console.log("Email res: ", res);
            } catch (error) {
                console.log(error);
            }
            res.json({
                token: userToken,
                username: username.trim(),
            });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.verifySignUp = async (req, res, next) => {
    console.log("VERIFING USER!");
    console.log(req.params.token);
    const verify = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const { email, password, username, phoneNumber, rollNumber } = verify;
    console.log(`${email} ${password} ${username}`);
    console.log(verify);
    if (verify) {
        try {
            const exists = await AccountApprove.findOne({
                email: email,
            });
            if (exists) {
                return res.json({
                    message: "User approval will shortly be validated!",
                });
            }
            const newAccountApprove = new AccountApprove({
                username: username.trim(),
                email: email.trim(),
                password: password.trim(),
                phoneNumber: phoneNumber.trim(),
                rollNumber: rollNumber.trim(),
            });
            console.log("this preSave: ", newAccountApprove);
            newAccountApprove.password = await bcrypt.hash(
                newAccountApprove.password,
                10
            );
            await newAccountApprove.save();
            res.send(
                `<div style={{
            textAlign: "center",
        }}><h1>Verification Successfull ✅</h1><br/><h1>You'll be notified when admin accepts your login</h1></div>`
            );
        } catch (error) {
            console.log(error);
        }
    } else {
        res.send("<h1>Error!</h1>");
    }
};

exports.editProfilePic = async (req, res, next) => {
    try {
        console.log(req.files);
        const token = req.body.token;
        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            const uploadCloudinary = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    upload_preset: "khq1jtjg",
                }
            );
            console.log(uploadCloudinary);
            user.profilePic = uploadCloudinary.secure_url;
            await user.save();
            res.status(200).json({
                message: "Profile pic updated successfully",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.editBackgroundPic = async (req, res, next) => {
    try {
        console.log(req.files);
        const token = req.body.token;
        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            const uploadCloudinary = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    upload_preset: "khq1jtjg",
                }
            );
            console.log(uploadCloudinary);
            user.backgroundPic = uploadCloudinary.secure_url;
            await user.save();
            res.status(200).json({
                message: "Background pic updated successfully",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.uploadPost = async (req, res, next) => {
    try {
        const uploadCloudinary = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                upload_preset: "khq1jtjg",
            }
        );
        console.log(uploadCloudinary);
        const { caption, token } = req.body;
        console.log(process.env.JWT_SECRET);
        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            const post = new Post({
                user: user._id,
                caption: caption,
                imageUrl: uploadCloudinary.secure_url,
                college: user.college,
            });
            await post.save();
            user.posts.push(post._id);
            await user.save();
            res.status(200).json({
                message: "Post uploaded successfully",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.logout = ({ res }, { req }) => {
    try {
        if (req.body.token) {
            verify(req.body.token)
                .then((decoded) => {
                    console.log(decoded);
                    User.findOne(
                        {
                            username: decoded.username,
                        },
                        (err, user) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "User not found",
                                });
                            } else {
                                console.log(user);
                                user.tokens = user.tokens.filter((token) => {
                                    return token.token !== req.body.token;
                                });
                                user.save((err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            message: "Error occurred",
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            message: "Logged out successfully",
                                        });
                                    }
                                });
                            }
                        }
                    );
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        message: "Token is not valid",
                    });
                });
        } else {
            res.json({
                success: false,
                message: "Token is not provided",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

exports.searchUsers = async (req, res, next) => {
    try {
        const { email } = jwt.verify(req.query.token, process.env.JWT_SECRET);
        // if (req.query.searchTerm === "") {
        //     res.status(200).json({
        //         message: "Please enter a search term",
        //     });
        // }
        const searchUser = req.query.searchTerm;
        // console.log(searchUser);
        User.find({
            $and: [
                { username: { $regex: searchUser, $options: "i" } },
                { email: { $ne: email } },
            ],
        })
            .limit(6)
            .then((users) => {
                res.status(200).json({ users: users });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: "Internal Server Error",
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

exports.updateSchoolInfo = async (req, res) => {
    try {
        const { username } = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            if (req.body.primarySchool !== undefined) {
                user.primarySchool = req.body.primarySchool;
            }
            if (req.body.secondarySchool !== undefined) {
                user.secondarySchool = req.body.secondarySchool;
            }
            if (req.body.bio !== undefined) {
                user.bio = req.body.bio;
            }
            user.save();
            res.status(200).json({
                message: "School info updated successfully",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

exports.updateLocationInfo = async (req, res) => {
    try {
        const { username } = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            if (req.body.location !== undefined) {
                user.location = req.body.location;
            }
            if (req.body.hometown !== undefined) {
                user.hometown = req.body.hometown;
            }
            user.save();
            res.status(200).json({
                message: "Location info updated successfully",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const { username } = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username }).select({
            username: 1,
            email: 1,
            _id: 0,
            rollNumber: 1,
            profilePic: 1,
            fullName: 1,
            Regulation: 1,
            Programme: 1,
            Year: 1,
            Branch: 1,
            Section: 1,
            DateOfAdmission: 1,
            Status: 1,
            Gender: 1,
            BloodGroup: 1,
            FatherName: 1,
            MotherName: 1,
            AadharNumber: 1,
            Mobile: 1,
            birthDate: 1,
        });
        if (user) {
            res.status(200).json({
                user: user,
                success: true,
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
