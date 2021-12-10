const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    user1:{
        type:STRING,
        required:true,
    },
    user2:{
        type:STRING,
        required:true,
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("chat",ChatSchema);