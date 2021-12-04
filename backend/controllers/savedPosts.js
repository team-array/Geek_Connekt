const verify = require("../middlewares/verifyuser").verifyuser;
const user = require("../models/user");
const async = require("async"); 

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
                            message: "Post as been saved successfully",
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
                            title: "Post Saved",
                            message: "Error saving post",
                        });
                    }else{
                        return res.status(200).send({
                            success: true,
                            title:"Post Unsaved",
                            message: "Post as been unsaved post successfully",
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

const getSavedPosts = ({ res }, { req }) => {
    try {
        verify(req.body.token)
            .then(async (result) => {
                try {
                    if (result) {
                        const { username } = result;
                        const savePost = await user.findOne({ username });
                        return res.status(200).send({
                            success: true,
                            message: "Saved posts",
                            savedPosts: savePost.savedPosts,
                        });
                    } else {
                        return res.status(200).json({
                            message: "Unauthorized user",
                            success: false,
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
                res.status(200).json({
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

const getMySavedPosts = ({ res }, { req }) => {
    try {
        console.log(req.body);
        verify(req.body.token)
            .then(async (result) => {
                try {
                    if (result) {
                        const { username } = result;
                        // get posts from users db which was refrenced by the user
                        const posts = await user.findOne({ username }).populate('savedPosts');
                        let saved = {};
                        Promise.all(posts.savedPosts.map(async (post) => {
                            const postData = await user.findOne({ _id: post.user }).select({'username':1,'profilePic':1});
                            saved[post._id] = {
                                username:postData.username,
                                profilePic:postData.profilePic,
                            }
                        })).then(() => {
                            console.log(saved);
                            let savedPostsWithUser = [];
                            posts.savedPosts.forEach((post) => {
                                savedPostsWithUser.push({
                                    postId: post._id,
                                    caption: post.caption,
                                    imageUrl: post.imageUrl,
                                    comments: post.comments,
                                    likes: post.likes,
                                    createdAt: post.createdAt,
                                    username: saved[post._id].username,
                                    profilePic: saved[post._id].profilePic,
                                });
                            });
                            return res.status(200).send({
                                success: true,
                                message: "Saved posts",
                                savedPosts: savedPostsWithUser,
                            });
                        });
                    } else {
                        return res.status(200).json({
                            message: "Unauthorized user",
                            success: false,
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
                res.status(200).json({
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
    getSavedPosts,
    getMySavedPosts
};