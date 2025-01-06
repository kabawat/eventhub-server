const { attendanceModel, eventModel } = require("#src/models");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");

async function fetchEvent(req, res) {
    try {
        const eventId = req?.params?.id;
        const userId = req.user_id;
        if (!eventId || !userId) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                error: 'Event ID and User ID are required',
            });
        }

        const existingAttendance = await attendanceModel.findOne({
            event: eventId,
            user: userId,
        }).populate({
            path: 'event',
            select: 'totalAttendance description location title date',
        }).select('event user').lean();

        if (existingAttendance) {
            return res.status(STATUS_CODES?.SUCCESS).json({
                message: 'Attendance already marked for this event',
                data: existingAttendance?.event,
                attended: true,
                status: true,
            });
        }

        // Fetch event details from eventModel if attendance is not found
        const eventDetails = await eventModel.findById(eventId).select('totalAttendance description location title date').lean();

        if (eventDetails) {
            return res.status(STATUS_CODES?.SUCCESS).json({
                message: 'Attendance not marked for this event',
                data: eventDetails,
                attended: false,
                status: true,
            });
        }

        return res.status(STATUS_CODES?.NOT_FOUND).json({
            message: 'Event not found',
            attended: false,
            status: false,
        });
    } catch (error) {
        res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
            message: Errors?.attendanceError,
            error: error?.message,
            status: false,
        });
    }
}

module.exports = fetchEvent;
