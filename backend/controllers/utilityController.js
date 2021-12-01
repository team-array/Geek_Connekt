const utility = require('../models/utility');
const verify = require("../middlewares/verifyuser").verifyuser;


const addutility = ({res},{req}) => {
    try{
        verify(req.body.token).then((user)=>{
            if(user.role==="Student"){
                res.status(200).json({
                    success:false,
                    message: "You are not authorized to perform this action"
                });
            }else{
                const newUtility=new utility({
                    title:req.body.title,
                    description:req.body.description,
                    websitelink:req.body.websitelink,
                    features:req.body.features,
                    addedBy:user.username
                })
                newUtility.save((err,result)=>{
                    if(err){
                        res.status(200).json({
                            success:false,
                            message: err.message
                        });
                    }else{
                        res.status(200).json({
                            success:true,
                            message: "Utility added successfully"
                        });
                    }
                });
            }
        }).catch((err)=>{
            console.log(err);
            res.status(200).json({
                success:false,
                message: "Invalid Token"
            });
        }
        );
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status:500,
            message:"Internal server error"
        });
    }
}

module.exports = {
    addutility
}