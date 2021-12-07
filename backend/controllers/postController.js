const User = require("../models/user");
const Post = require("../models/post");
const Notification = require("../models/notifications");
const jwt = require("jsonwebtoken");

exports.getUserPosts = async (req, res, next) => {
    try {
        console.log(req.query);
        const userId = req.query.userId;
        const user = await User.findById(userId).populate("posts");
        // console.log(user);
        // if (user) {
        //     res.status(200).json({
        //         message: "User posts fetched successfully",
        //         posts: user.posts.slice(
        //             (req.query.pageNumber - 1) * 3,
        //             req.query.pageNumber * 3
        //         ),
        //     });
        // } else {
        //     res.status(404).json({
        //         message: "User not found",
        //     });
        // }
        if (user) {
            const posts = await Post.find({ user: userId })
                .skip((req.query.pageNumber - 1) * 3)
                .limit(3);
            Post.count({ userId: userId }).then((count) => {
                res.status(200).json({
                    message: "Posts fetched successfully",
                    posts: posts,
                    remPosts: count - req.query.pageNumber * 3,
                });
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error occured while fetching posts",
        });
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const userId = req.query.id;
        const user = await User.findById(userId);
        if (user) {
            const posts = await Post.find({ college: user.college })
                .populate("user")
                .skip((req.query.pageNumber - 1) * 3)
                .sort({ createdAt: -1 })
                .limit(3);
            Post.count().then((count) => {
                res.status(200).json({
                    message: "Posts fetched successfully",
                    posts: posts,
                    remPosts: count - req.query.pageNumber * 3,
                });
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error occured while fetching posts",
        });
    }
};

exports.likePost = async (req, res, next) => {
    try {
        // console.log(req.body);
        const postId = req.body.postId;
        const userId = req.body.userId;
        // console.log(postId, userId);
        const post = await Post.findById(postId);
        const user = await User.findById(userId);
        const postUser = await User.findById(post.user);
        if (post && user) {
            const userLiked = post.likes.find((like) => like._id == userId);
            // console.log("Userliked: ", userLiked);
            if (userLiked) {
                const likes = post.likes.filter((l) => l._id != userId);
                // console.log("Likes: ", likes);
                post.likes = likes;
                post.save();
                res.status(200).json({
                    message: "Post unliked successfully",
                });
            } else {
                post.likes.push(userId);
                post.save();
                res.status(200).json({
                    message: "Post liked successfully",
                });
                var onlineUser = req.app.get("onlineUser");
                var io = req.app.get("socketio");
                console.log(postUser.username, user.username);
                if (postUser.username != user.username) {
                    console.log("onlineUsers: ", onlineUser);
                    const toUser = onlineUser.find((onlineuser) => {
                        // console.log("onelineUser: ", onlineuser);
                        return onlineuser.userId == postUser._id;
                    });
                    console.log("touser:", toUser);
                    if (toUser) {
                        io.to(toUser.socketId).emit("like", {
                            profilePic: user.profilePic,
                            lickedBy: user.username,
                            postId: postId,
                        });
                    }
                    postUser.newNotifications = postUser.newNotifications + 1;
                    postUser.save();
                    const newNofication = new Notification({
                        user: postUser.username,
                        likedBy: user.username,
                        postId: postId,
                        type: "like",
                        message: user.username + " liked your post",
                        profilePic: user.profilePic,
                    });
                    newNofication.save();
                }
            }
            // console.log(post.likes);
        } else {
            res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error occured while liking post",
        });
    }
};

exports.getComments = async (req, res, next) => {
    try {
        // console.log(req.query);
        const postId = req.query.postId;
        const post = await Post.findById(postId)
            .populate("comments.user", "username")
            .populate("comments.user", "profilePic")
            .populate("user", "username")
            .populate("user", "profilePic");
        if (post) {
            res.status(200).json({
                message: "Comments fetched successfully",
                post: post,
            });
        } else {
            res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error occured while fetching comments",
        });
    }
};

exports.commentPost = async (req, res, next) => {
    console.log(req.body);
    try {
        const postId = req.body.postId;
        const userId = req.body.userId;
        const comment = req.body.comment;
        // console.log(postId, userId, comment);
        const post = await Post.findById(postId);
        const user = await User.findById(userId);
        const postUser = await User.findById(post.user);
        // console.log(post, user);
        if (post && user) {
            post.comments.push({
                user: userId,
                comment: comment,
                name: user.username,
                profilePic: user.profilePic,
            });
            post.save();
            res.status(200).json({
                message: "Comment posted successfully",
            });
            var onlineUser = req.app.get("onlineUser");
            var io = req.app.get("socketio");
            console.log(postUser.username, user.username);
            if (postUser.username != user.username) {
                console.log("onlineUsers: ", onlineUser);
                const toUser = onlineUser.find((onlineuser) => {
                    // console.log("onelineUser: ", onlineuser);
                    return onlineuser.userId == postUser._id;
                });
                console.log("touser:", toUser);
                if (toUser) {
                    io.to(toUser.socketId).emit("comment", {
                        profilePic: user.profilePic,
                        lickedBy: user.username,
                        postId: postId,
                    });
                }
                postUser.newNotifications = postUser.newNotifications + 1;
                postUser.save();
                const newNofication = new Notification({
                    user: postUser.username,
                    likedBy: user.username,
                    postId: postId,
                    type: "like",
                    message: user.username + " liked your post",
                    profilePic: user.profilePic,
                });
                newNofication.save();
            }
        } else {
            res.status(404).json({
                message: "Post or user not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error occured while commenting post",
        });
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        console.log(req.body);
        const postId = req.body.postId;
        const { username } = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const post = await Post.findById(postId);
        const user = await User.findOne({ username: username });
        // console.log(username, user);
        console.log(post.caption);
        // console.log(post.user, user._id);
        // console.log(post.user.toString() == user._id.toString());
        console.log(post._id);
        if (post && user) {
            if (post.user.toString() == user._id.toString()) {
                post.remove();
                console.log(user.posts);
                user.posts = user.posts.filter(
                    (p) => p.toString() != postId.toString()
                );
                console.log(user.posts);
                user.save();
                res.status(200).json({
                    message: "Post deleted successfully",
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized",
                });
            }
        } else {
            res.status(404).json({
                message: "Post or user not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error occured while deleting post",
        });
    }
};

exports.deletePostAdmin = async (req, res, next) => {
    try {
        console.log(req.body);
        const postId = req.body.postId;
        const post = await Post.findById(postId);
        console.log(post.caption);
        if (post) {
            post.remove();
            const userId = post.user;
            const user = await User.findById(userId);
            user.posts = user.posts.filter(
                (p) => p.toString() != postId.toString()
            );
            user.save();
            res.status(200).json({
                message: "Post deleted successfully",
            });
        } else {
            res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error occured while deleting post",
        });
    }
};
