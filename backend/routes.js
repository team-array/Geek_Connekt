<<<<<<< HEAD
const express = require('express');
const router = express.Router();

=======
const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

router.post("/editProfilePic", userController.editProfilePic);

router.post("/uploadPost", userController.uploadPost);

router.get("/", (req, res, next) => {
    res.send("<h1>Welcome to Geek ConnecKt API!</h1>");
});

module.exports = router;
>>>>>>> c70c6c41bc9efc0c23b24978ef6d15878d51f5fd
