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

function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

const getutilities = ({res},{req}) => {
    try{
        verify(req.body.token).then((user)=>{
                utility.find({},(err,result)=>{
                    if(err){
                        return res.status(200).json({
                            success:false,
                            message: err.message
                        });
                    }else{
                        let utilities=result.map((result)=>{
                            if(result.rating.length>0){
                                let rating = 0;
                                let myrating = -1;
                                let numberOfRating = result.rating.length;
                                let totalRating = result.rating.map((userrating)=>{
                                    if(userrating.username==user.username){
                                        myrating = userrating.rating;
                                    }
                                    rating = rating + userrating.rating;
                                    return rating;
                                });
                                rating = round(totalRating/numberOfRating*1.0,0.5);
                                return {
                                    success:true,
                                    message: "Utilities fetched successfully",
                                    data:{
                                        rating,
                                        title:result.title,
                                        description:result.description,
                                        websitelink:result.websitelink,
                                        features:result.features,
                                        myrating
                                    }
                                };
                            }else{
                                return {
                                    success:true,
                                    message: "Utilities fetched successfully",
                                    data:{
                                        rating:-1,
                                        title:result.title,
                                        description:result.description,
                                        websitelink:result.websitelink,
                                        features:result.features,
                                        myrating:-1
                                    }
                                }
                            }
                        });
                        return res.status(200).json({
                            success: true,
                            utilities
                        });
                    }
                });
        }).catch((err)=>{
            console.log(err);
            return res.status(200).json({
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
    addutility,
    getutilities
}