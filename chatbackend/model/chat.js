const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    user1:{
        type:String,
        required:true,
    },
    user2:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("chat",ChatSchema);