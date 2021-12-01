const verify = require("../middlewares/verifyuser").verifyuser;
const user = require("../models/user");
const {cloudinary} = require("../utils/cloudinary");

const addachievement = async ({res}, {req}) => {
    try {
        console.log(req.body);
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
                console.log(typeof result);
                const new_achievement = {
                    achievement_image: result.url
                };
                console.log(new_achievement);
                const new_user_achievement = await user.findOneAndUpdate({username: username.username}, {$push: {...new_achievement}});
                if (!new_user_achievement) {
                    return res.status(200).json({
                        success: false,
                        message: "Error adding achievement"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Achievement added successfully"
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

module.exports = {
    addachievement
}