const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

router.post("/editProfilePic", userController.editProfilePic);

router.post("/uploadPost", userController.uploadPost);

router.get("/getUserImage", postController.getUserPosts);

router.get("/", (req, res, next) => {
    res.send("<h1>Welcome to Geek ConnecKt API!</h1>");
});

router.post("/addEvents",(res,req)=>{
    require("./controllers/eventController").addEvents(req,res);
});

router.post("/getEvents",(res,req)=>{
    require("./controllers/eventController").getEvents(req,res);
});

router.post("/logout",(res,req)=>{
    require("./controllers/userController").logout(res,req);
})

module.exports = router;
