const xlsx = require("xlsx");
const Attendance = require("../models/attendance");
const User = require("../models/user");
const verify = require("../middlewares/verifyuser").verifyuser;

exports.uploadAttendance = async (req, res) => {
    console.log("uploadAttendance");
    console.log(req.body);
    console.log(req.files);
    verify(req.body.token).then(async (user1)=>{
        if(user1.role!="Student"){
            let file = req.files.file;
            var workbook = xlsx.readFile(file.tempFilePath);
            var sheet_name_list = workbook.SheetNames;
            var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            console.log(xlData);
            try {
                xlData.forEach(async (element, idx) => {
                    if (idx > 0) {
                        const user = await User.findOne({
                            rollNumber: element.RollNumber,
                        });
                        if (user) {
                            let attendanceList = [];
                            for (var key of Object.keys(element)) {
                                if (key !== "RollNumber") {
                                    console.log(
                                        `${key} : ${element[key]} Total: ${xlData[0][key]}`
                                    );
                                    const temp = {
                                        attendanceCategory: {
                                            className: key,
                                            totalClasses: xlData[0][key],
                                            attendedClasses: element[key],
                                        },
                                    };
                                    attendanceList.push(temp);
                                }
                            }
                            const updateAttendance = await Attendance.findOne({
                                userId: user._id,
                            });
                            if (updateAttendance) {
                                console.log(updateAttendance);
                                updateAttendance.attendanceList = attendanceList;
                                await updateAttendance.save();
                            } else {
                                const attendance = new Attendance({
                                    userId: user._id,
                                    attendanceList: attendanceList,
                                });
                                console.log(attendance);
                                await attendance.save();
                            }
                        }
                    }
                    if(idx==xlData.length-1){
                        res.status(200).json({
                            message: "Attendance Uploaded Successfully",
                            success: true,
                        });
                    }
                    });
            } catch (err) {
                console.log(err);
                return res.status(400).json({
                    error: err,
                });
            }
        }
    }).catch((err)=>{
        console.log(err);
        return res.status(200).json({
            message: "Invalid Token",
            success: false,
        });
    }
    );
};


exports.getAttendance = async (req, res) => {
    try{
        const attendance = await Attendance.findOne({
            userId: req.body.userId,
        });
        console.log(attendance);
        if(attendance){
            let classNames = [];
            let totalClasses = [];
            let attendedClasses = [];
            attendance.attendanceList.forEach((element)=>{
                classNames.push(element.attendanceCategory.className);
                totalClasses.push(element.attendanceCategory.totalClasses);
                attendedClasses.push(element.attendanceCategory.attendedClasses);
            });
            let sumOfTotalClasses = totalClasses.reduce((a, b) => a + b, 0);
            let sumOfAttendedClasses = attendedClasses.reduce((a, b) => a + b, 0);
            try{
                let percentage = ((sumOfAttendedClasses/sumOfTotalClasses)*100).toFixed(2);
                return res.status(200).json({
                    message: "Attendance Fetched Successfully",
                    success: true,
                    classNames: classNames,
                    totalClasses: totalClasses,
                    attendedClasses: attendedClasses,
                    percentage: percentage,
                    sumOfTotalClasses,
                    sumOfAttendedClasses,
                });
            }catch{
                return res.status(200).json({
                    message: "Attendance fetched Successfully",
                    success: true,
                    classNames,
                    totalClasses,
                    attendedClasses,
                    sumOfTotalClasses,
                    sumOfAttendedClasses,
                    percentage: "NA",
                });
            }
        }else{
            return res.status(200).json({
                message: "Attendance not found",
                success: false,
            });
        }
    }catch(Err){
        console.log(Err);
        return res.status(400).json({
            error: Err,
        });
    }
};