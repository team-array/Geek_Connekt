const User = require("../models/user");
const Post = require("../models/post");

exports.getUserPosts = async (req, res, next) => {
    try {
        console.log(req.query);
        const userId = req.query.userId;
        const user = await User.findById(userId);
        if (user) {
            const posts = await Post.find({ userId: userId })
                .skip((req.query.pageNumber - 1) * 6)
                .limit(6);
            Post.count({ userId: userId }).then((count) => {
                res.status(200).json({
                    message: "Posts fetched successfully",
                    posts: posts,
                    remPosts: count - req.query.pageNumber * 6,
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
