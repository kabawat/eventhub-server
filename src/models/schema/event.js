const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    totalAttendance: { type: Number, default: 0 },
    description: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

eventSchema.index({ description: 1 });
eventSchema.index({ isDeleted: 1 });
eventSchema.index({ title: 1 });

eventSchema.methods.incrementField = async function (fieldName) {
    if (this[fieldName] !== undefined) {
        this[fieldName] += 1;
        await this.save();
    } else {
        throw new Error(`Field ${fieldName} does not exist on Event schema.`);
    }
};

module.exports = eventSchema;