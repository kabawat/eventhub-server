const { eventModel } = require("#src/models");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");

async function createEventController(req, res) {
    try {
        const { title, description, location, date } = req.body;
        const errors = {};

        // Validate required fields
        if (!title) errors.title = "Title is required.";
        if (!description) errors.description = "Description is required.";
        if (!location) errors.location = "Location is required.";
        if (!date) errors.date = "Date is required.";
        else if (isNaN(new Date(date))) errors.date = "Invalid date format.";

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: Errors?.validationError,
                errors
            });
        }

        // Create the event
        const event = new eventModel({
            title,
            description,
            location,
            date: new Date(date),
        });

        await event.save();

        return res.status(STATUS_CODES?.CREATED).json({
            message: "Event created successfully",
            status: true
        });
    } catch (err) {
        console.error(err);
        return res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
            message: Errors?.serverError,
            error: err.message
        });
    }
};

module.exports = createEventController;
