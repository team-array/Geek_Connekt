const verify = require("../middlewares/verifyuser").verifyuser;
const user = require("../models/user");
const {cloudinary} = require("../utils/cloudinary");

const addachievement = async ({res}, {req}) => {
    try {
        verify(req.body.token).then(async (username)=>{
            const user_achievement = await user.findOne({username: username.username});
            if (!user_achievement) {
                return res.status(200).json({
                    success: false,
                    message: "User not found"
                });
            }
            cloudinary.uploader.upload(req.body.achievement_image, async (err, result) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error uploading image"
                    });
                }
                const new_achievement = {
                    achievement_image: result.secure_url
                };
                const new_user_achievement = await user.findOneAndUpdate({username: username.username}, {$push: {achievements:new_achievement.achievement_image}});
                console.log(new_user_achievement);
                if (!new_user_achievement) {
                    return res.status(200).json({
                        success: false,
                        message: "Error adding achievement"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Achievement added successfully",
                    achievement:result.secure_url
                });
            });
        }).catch(err=>{
            console.log(err);
            return res.status(200).json({
                success: false,
                message: "Error verifying user"
            });
        });
    }catch(err){
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getachievements = async ({res}, {req}) => {
    try {
        verify(req.body.token).then(async (username)=>{
            const user_achievement = await user.findOne({username: req.body.username});
            if (!user_achievement) {
                return res.status(200).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: true,
                achievements: user_achievement.achievements
            });
        });
    }catch(err){
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const deleteAchievement = async ({res}, {req}) => {
    try {
        verify(req.body.token).then(async (username)=>{
            const user_achievement = await user.findOne({username: username.username});
            if (!user_achievement) {
                return res.status(200).json({
                    success: false,
                    message: "User not found"
                });
            }
            let public_id;
            try{
                public_id=user_achievement.achievements[req.body.achievement_index].split("/")[7].split(".")[0];
            }
            catch(err){
                return res.status(200).json({
                    success: false,
                    message: "achievement not found"
                });
            }
            user_achievement.achievements = user_achievement.achievements.filter((ele,index)=>{
                return req.body.achievement_index !== index;
            });
            let result = await cloudinary.uploader.destroy(public_id);
            user_achievement.save((err, result)=>{
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error deleting achievement"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Achievement deleted successfully",
                    achievements:result.achievements
                });
            });
        }).catch(err=>{
            console.log(err);
            return res.status(200).json({
                success: false,
                message: "Error verifying user"
            });
        }
        );
    }catch(err){
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    addachievement,
    getachievements,
    deleteAchievement
}