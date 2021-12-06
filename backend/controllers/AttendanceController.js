const xlsx = require("xlsx");
const Attendance = require("../models/attendance");
const User = require("../models/user");

exports.uploadAttendance = async (req, res) => {
    console.log("uploadAttendance");
    // console.log(req.body);
    // console.log(req.files);
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
                    const attendance = new Attendance({
                        userId: user._id,
                        attendanceList: attendanceList,
                    });
                    console.log(attendance);
                    attendance.save();
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
};
