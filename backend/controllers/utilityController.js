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
                            message: "Utility added successfully",  
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
                                });
                                rating = round(rating/numberOfRating*1.0,0.5);
                                console.log(rating,numberOfRating,rating)
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

const updateRating = ({res}, {req}) => {
    try{
        verify(req.body.token).then((user)=>{
            utility.findOne({title:req.body.title},(err,result)=>{
                if(err){
                    return res.status(200).json({
                        success:false,
                        message: err.message
                    });
                }else{
                    if(result){
                        let exists = result.rating.find((userrating)=>{
                            if(userrating.username==user.username){
                                return true;
                            }
                        });
                        if(!exists){
                            utility.updateOne({title:req.body.title},{$push:{rating:{username:user.username,rating:req.body.rating}}},(err,results)=>{
                                if(err){
                                    return res.status(200).json({
                                        success:false,
                                        message: err.message
                                    });
                                }else{
                                    let rating = req.body.rating;
                                    let myrating = -1;
                                    let numberOfRating = result.rating.length+1;
                                    result.rating.map((userrating)=>{
                                        if(userrating.username==user.username){
                                            myrating = userrating.rating;
                                        }
                                        rating = rating + userrating.rating;
                                    });
                                    rating = round(rating/numberOfRating*1.0,0.5);
                                    console.log(rating)
                                    return res.status(200).json({
                                        success:true,
                                        message: "Rating updated successfully",
                                        rating
                                    });
                                }
                            });
                        }else{
                            return res.json({
                                success:false,
                                message: "You have already rated this utility"
                            });
                        }
                    }else{
                        return res.status(200).json({
                            success:false,
                            message: "Utility not found"
                        });
                    }
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
    getutilities,
    updateRating
}