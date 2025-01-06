const { attendanceModel } = require("#src/models");
const { eventModel } = require("#src/models");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");

async function AttendEventController(req, res) {
    try {
        const eventId = req?.params?.id;
        const userId = req.user_id;

        if (!eventId || !userId) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                error: 'Event ID and User ID are required',
            });
        }

        // Check if attendance already exists
        const existingAttendance = await attendanceModel.findOne({
            event: eventId,
            user: userId,
        });

        if (existingAttendance) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                error: 'Attendance already marked for this event',
            });
        }

        // Mark attendance
        const attendance = new attendanceModel({
            event: eventId,
            user: userId,
        });

        // Increment totalAttendance for the event
        const event = await eventModel.findById(eventId);
        if (event) {
            await attendance.save();
            await event.incrementField('totalAttendance');
        } else {
            return res.status(STATUS_CODES?.NOT_FOUND).json({
                error: 'Event not found',
            });
        }

        res.status(STATUS_CODES?.CREATED).json({
            message: 'Attendance marked successfully',
            status: true,
        });
    } catch (error) {
        res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
            message: Errors?.attendanceError,
            error: error?.message,
            status: false,
        });
    }
}

module.exports = AttendEventController;
