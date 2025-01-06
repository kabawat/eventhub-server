const mongoose = require('mongoose')
const eventSchema = require('./schema/event')
const attendanceSchema = require('./schema/attendance')
const userSchema = require('./schema/user')

const Models = {
    attendanceModel: mongoose.model("Attendance", attendanceSchema),
    eventModel: mongoose.model("Event", eventSchema),
    userModel: mongoose.model("User", userSchema),
}
module.exports = Models