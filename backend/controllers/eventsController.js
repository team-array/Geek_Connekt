const event = require('../models/event');
const verify = require("../middlewares/verifyuser").verifyuser;

const addEvents = ({res},{req}) => {
    try{
        console.log(req)
        if (req.body.token) {
            verify(req.body.token).then((decoded) => {
                if(decoded.role==="Student"){
                    return res.json({
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
                            return res.status(200).send({success:false});
                        }
                        return res.status(200).send({...event,success:true});
                    });
                }
            }).catch((err) => {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                }
            );
        }else{
            return res.status(200).json({
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


// const addDay = (date) => {
//     console.log("date",date)
//     date.setDate(date.getDate() + 1);
//     return date.removeTime();
// }

const getEvents = ({res},{req}) => {
    try{
        console.log(req.body)
        if (req.body.token) {
            console.log(Date(req.body.EventDate),req.body.EventDate.end)
            verify(req.body.token).then((decoded) => {
                event.find({
                    EventDate:{
                        "$gte": new Date(req.body.EventDate.start),
                        "$lt": new Date(req.body.EventDate.end)
                    }
                },(err,events)=>{
                    if(err){
                        return res.status(200).send({success:false});
                    }
                    return res.status(200).send({events,success:true});
                });
            }).catch((err) => {
                res.json({
                    success: false,
                    message: 'Token is not valid'
                });
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

const getAllEvents = ({res},{req}) => {
    try{
        console.log(req.body)
        if (req.body.token) {
            verify(req.body.token).then((decoded) => {
                event.find({
                },(err,events)=>{
                    if(err){
                        res.status(200).send({success:false});
                    }
                    res.status(200).send({events,success:true});
                });
            }).catch((err) => {
                res.json({
                    success: false,
                    message: 'Token is not valid'
                });
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
    getEvents,
    getAllEvents
}