const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

router.post("/editProfilePic", userController.editProfilePic);

router.post("/uploadPost", userController.uploadPost);

router.get("/getUserImage", postController.getUserPosts);

router.get("/getAllPosts", postController.getAllPosts);

router.get("/", (req, res, next) => {
    res.send("<h1>Welcome to Geek ConnecKt API!</h1>");
});

router.post("/addEvents",(res,req)=>{
    require("./controllers/eventsController").addEvents(res,req);
});

router.post("/getEvents",(res,req)=>{
    require("./controllers/eventsController").getEvents(res,req);
});

router.post("/getAllEvents",(res,req)=>{
    require("./controllers/eventsController").getAllEvents(res,req);
});

router.post("/logout",(res,req)=>{
    require("./controllers/userController").logout(res,req);
});


module.exports = router;
