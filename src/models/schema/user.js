const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpire: { type: Date },
    isVerified: { type: Boolean, default: false },
    isStaff: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = userSchema;
