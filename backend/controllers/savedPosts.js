const verify = require("../middlewares/verifyuser").verifyuser;
const user = require("../models/user");
const mongoose = require("mongoose");

const SavePost = ({ res }, { req }) => {
  try {
    verify(req.body.token)
      .then(async (result) => {
        try {
          if (result) {
            const { postId } = req.body;
            const { username } = result;
            const savePost = await user.findOne({ username });
            let alreadySaved = false;
            savePost.savedPosts.forEach((_id) => {
                if (_id.toString() === postId) {
                    alreadySaved = true;
                }
            });
            if (!alreadySaved) {
                savePost.savedPosts.push(postId);
                savePost.save((err, post) => {
                    if (err) {
                        return res.status(200).send({
                            success: false,
                            message: "Error saving post",
                        });
                    }else{
                        return res.status(200).send({
                            success: true,
                            message: "Post saved successfully",
                        });
                    }
                })
            }else{
                savePost.savedPosts = savePost.savedPosts.filter((_id) => {
                    return _id.toString() !== postId;
                });
                savePost.save((err, post) => {
                    if (err) {
                        return res.status(200).send({
                            success: false,
                            message: "Error saving post",
                        });
                    }else{
                        return res.status(200).send({
                            success: true,
                            message: "unsaved post successfully",
                        });
                    }
                });
            }
          } else {
            return res.status(401).json({
              message: "Unauthorized user",
              status: 401,
            });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
          });
        }
      })
      .catch((err) => {
        res.status(401).json({
          message: "Unauthorized user",
          success: false,
        });
      });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


module.exports = {
    SavePost,
};