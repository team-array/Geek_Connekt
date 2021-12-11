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
    seen:{
        type:String,
        default:"none",
    }
});

module.exports = mongoose.model("chat",ChatSchema);