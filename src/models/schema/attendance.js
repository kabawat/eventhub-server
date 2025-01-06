const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = attendanceSchema;