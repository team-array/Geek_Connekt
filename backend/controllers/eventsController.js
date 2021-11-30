const event = require('../models/event');
const verify = require("../middlewares/verifyuser").verifyuser;

const addEvents = (res,req) => {
    try{
        if (req.body.token) {
            verify(req.body.token, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else if(decoded.role==="Student"){
                    res.json({
                        success: false,
                        message: 'You are not authorized to add events'
                    });
                } else {    
                    const newEvent = new event({
                        EventName: req.body.EventName,
                        EventSubtitle: req.body.EventSubtitle,
                        EventDescription: req.body.EventDescription,
                        EventLink: req.body.EventLink,
                        EventDate: req.body.EventDate,
                        addedBy: decoded.username,
                    });
                    newEvent.save((err,event)=>{
                        if(err){
                            res.status(200).send({success:false});
                        }
                        res.status(200).send({...event,success:true});
                    });
                }
            });
        }else{
            res.json({
                success: false,
                message: 'Token is not provided'
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getEvents = (res,req) => {
    try{
        if (req.body.token) {
            verify(req.body.token, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else{
                    event.find({
                        EventDate:req.body.EventDate
                    },(err,events)=>{
                        if(err){
                            res.status(200).send({success:false});
                        }
                        res.status(200).send({...events,success:true});
                    });
                }
            });
        }else{
            res.json({
                success: false,
                message: 'Token is not provided'
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    addEvents,
    getEvents
}