const { cloudinary } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
const verify = require("../middlewares/verifyuser").verifyuser;

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


exports.updateSchoolInfo = async (req,res) => {
    try {
        const { username } = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            if (req.body.primarySchool!==undefined) {
                user.primarySchool = req.body.primarySchool;
            }
            if (req.body.secondarySchool!==undefined) {
                user.secondarySchool = req.body.secondarySchool;
            }
            if (req.body.bio!==undefined) {
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
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

exports.updateLocationInfo = async (req,res) => {
    try {
        const { username } = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            if (req.body.location!==undefined) {
                user.location = req.body.location;
            }
            if (req.body.hometown!==undefined) {
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
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}