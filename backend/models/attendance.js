const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AttendanceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    attendanceList: [
        {
            attendanceCategory: {
                className: {
                    type: String,
                    required: true,
                    // default: "asdasd",
                },
                totalClasses: {
                    type: Number,
                    // default: 10,
                    required: true,
                },
                attendedClasses: {
                    type: Number,
                    required: true,
                    // default: 7,
                },
            },
        },
    ],
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
