const { cloudinary } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

exports.editProfilePic = async (req, res, next) => {
    try {
        const uploadCloudinary = await cloudinary.uploader.upload(
            req.files.file.tempFilePath,
            {
                upload_preset: "khq1jtjg",
            }
        );
        console.log(uploadCloudinary);
        const token = req.body.token;
        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
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

exports.editProfilePic = async (req, res, next) => {
    try {
        const uploadCloudinary = await cloudinary.uploader.upload(
            req.files.file.tempFilePath,
            {
                upload_preset: "khq1jtjg",
            }
        );
        console.log(uploadCloudinary);
        const token = req.body.token;
        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ username: username });
        if (user) {
            user.backgroundPic = uploadCloudinary.secure_url;
            await user.save();
            res.status(200).json({
                message: "Picture Successfully Updated updated successfully",
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
