const User = require("../models/user");
const Notification = require("../models/notifications");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

exports.getNotifications = async (req, res) => {
    try {
        console.log("getNotification:", req.query);
        const { username } = jwt.verify(
            req.query.token,
            process.env.JWT_SECRET
        );
        const notifications = await Notification.find({
            user: username,
        })
            .sort({ createdAt: "desc" })
            .limit(req.query.count)
            .exec();
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
