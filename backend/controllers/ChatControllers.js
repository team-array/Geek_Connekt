const user = require("../models/user");
const chats = require("../models/chats");
const verify = require("../middlewares/verifyuser").verifyuser;

const getAllChats = async (req, res) => {
    try{
        verify(req.body.token).then(async (result) => {
            try{

                if (result) {
                    if(req.body.data===""){
                        console.log(result);
                        const userId = result.username;
                        let chatss = await chats.find({ user1: userId });
                        let topchats=[];
                        for (let i = 0; i < chatss.length; i++) {
                            let user2 = chatss[i].user2;
                            topchats.push({user2});
                        }
                        let chatIds = {};
                        for (let i = 0; i < chatss.length; i++) {
                            chatIds[chatss[i].user2] = true;
                        }
                        let users = await user.find({}).select({username: 1, _id: 0});
                        for(let i = 0; i < users.length; i++) {
                            if(users[i].username===result.username){
                                continue;
                            }
                            if(!chatIds[users[i].username]) {
                                topchats.push({user2: users[i].username});
                            }
                        }
                        res.status(200).json({ success: true, chats: topchats });
                    }else{
                        console.log(result);
                        const userId = result.username;
                        let chatss = await chats.find({ user1: userId,user2:
                            { "$regex": req.body.data, "$options": "i" }
                        });
                        let topchats=[];
                        for (let i = 0; i < chatss.length; i++) {
                            let user2 = chatss[i].user2;
                            topchats.push({user2});
                        }
                        let chatIds = {};
                        for (let i = 0; i < chatss.length; i++) {
                            chatIds[chatss[i].user2] = true;
                        }
                        let users = await user.find({
                            username:{ "$regex": req.body.data, "$options": "i" }
                        }).select({username: 1, _id: 0});
                        for(let i = 0; i < users.length; i++) {
                            if(users[i].username===result.username){
                                continue;
                            }
                            if(!chatIds[users[i].username]) {
                                topchats.push({user2: users[i].username});
                            }
                        }
                        res.status(200).json({ success: true, chats: topchats });
                    }
                } else {
                    res.status(200).json({ success: false, message: result.message });
                }
            }catch(err){
                console.log(err);
            }
        }
        ).catch(err => {
            console.log(err);
            res.status(200).json({ success: false, message: err.message });
        });
    }catch(err){
        res.status(200).json({ success: false, message: err.message });
    }
};

module.exports = {
    getAllChats
};
