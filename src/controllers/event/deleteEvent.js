const { eventModel } = require("#src/models");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");
const mongoose = require('mongoose')
async function softDeleteEventController(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                message: "Event ID is required.",
                status: false
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                message: "Invalid Event ID format.",
                status: false
            });
        }

        // Check if event exists and is not already deleted
        const event = await eventModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id), isDeleted: { $ne: true } },
            { $set: { isDeleted: true, isActive: false } },
            { new: true, projection: { _id: 1 } }
        );

        if (!event) {
            return res.status(STATUS_CODES?.NOT_FOUND).json({
                message: "Event not found or already deleted.",
                status: false
            });
        }

        return res.status(STATUS_CODES?.SUCCESS).json({
            message: "Event deleted successfully.",
            status: true
        });
    } catch (err) {
        console.error("Error in soft delete event:", err);
        return res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
            message: Errors?.serverError,
            error: err.message,
            status: false
        });
    }
};

module.exports = softDeleteEventController;
