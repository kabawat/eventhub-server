const { eventModel } = require("#src/models");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");

async function fetchAllEventController(req, res) {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const filter = {
            isDeleted: false
        };

        const events = await eventModel.find(filter)
            .select('-isDeleted -updatedAt')
            .lean()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalEvents = await eventModel.countDocuments(filter);
        const activeEvents = await eventModel.countDocuments({ isActive: true });

        res.status(200).json({
            events,
            totalPages: Math.ceil(totalEvents / limit),
            currentPage: page,
            totalEvents,
            activeEvents
        });
    } catch (err) {
        return res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
            message: Errors?.serverError,
            error: err.message
        });
    }
};

module.exports = fetchAllEventController;
