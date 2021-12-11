const user = require("../models/user");
const chats = require("../models/chats");
const verify = require("../middlewares/verifyuser").verifyuser;

const getAllChats = async (req, res) => {
    try{
        verify(req.body.token).then(async (result) => {
            try{

                if (result) {
                    if(req.body.data===""){
                        const userId = result.username;
                        let chatss = await chats.find({ user1: userId });
                        let topchats=[];
                        let chatIds = {};
                        console.log(chatss);
                        for (let i = 0; i < chatss.length; i++) {
                            let user2 = chatss[i].user2;
                            if(chatIds[chatss[i].user2]){
                                continue;
                            }
                            topchats.push({user2});
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
                        await Promise.all(topchats.map(async (chat) => {
                            let user2 = chat.user2;
                            let profilePic = await user.findOne({username: user2}).select({profilePic: 1,role:1});
                            chat.profilePic = profilePic.profilePic;
                            chat.role = profilePic.role;
                        }));
                        await Promise.all(topchats.map(async (chat) => {
                            let user2 = chat.user2;
                            let count = await chats.find({user1: result.username, user2: user2,"$or":[
                                {seen:"none"},
                                {seen:user2}
                            ]});
                            console.log(count);
                            chat.count = count.length;
                        }));
                        res.status(200).json({ success: true, chats: topchats });
                    }else{
                        console.log(result);
                        const userId = result.username;
                        let chatss = await chats.find({ user1: userId,user2:
                            { "$regex": req.body.data, "$options": "i" }
                        });
                        let topchats=[];
                        let chatIds = {};
                        for (let i = 0; i < chatss.length; i++) {
                            let user2 = chatss[i].user2;
                            if(chatIds[chatss[i].user2]){
                                continue;
                            }
                            topchats.push({user2});
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
