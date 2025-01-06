const { eventModel } = require("#src/models");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");

async function updateEventController(req, res) {
    try {
        const { id } = req.params;
        const { title, description, location, date, isActive } = req.body;
        const errors = {};

        // Validate required fields
        if (!id) errors.id = "Event ID is required.";
        if (date && isNaN(new Date(date))) errors.date = "Invalid date format.";

        if (Object.keys(errors).length > 0) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                message: Errors?.validationError,
                errors
            });
        }

        const event = await eventModel.findById(id);

        if (!event || event.isDeleted) {
            return res.status(STATUS_CODES?.NOT_FOUND).json({
                message: "Event not found or has been deleted.",
                status: false
            });
        }

        // Update event fields
        if (description) event.description = description;
        if (location) event.location = location;
        if (title) event.title = title;
        if (date) event.date = new Date(date);
        if (typeof isActive !== 'undefined') event.isActive = isActive;

        await event.save();

        return res.status(STATUS_CODES?.SUCCESS).json({
            message: "Event updated successfully",
            status: true
        });
    } catch (err) {
        return res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
            message: Errors?.serverError,
            error: err.message,
            status: false
        });
    }
};

module.exports = updateEventController;
