const { eventModel, attendanceModel } = require("#src/models");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");

async function fetchEventAdmin(req, res) {
    try {
        const eventId = req?.params?.id;
        if (!eventId) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                error: 'Event ID is required',
            });
        }

        const usersDetaile = await attendanceModel.find({
            event: eventId,
        }).populate({
            path: 'user',
            select: 'fullname email',
        }).select('user').lean();
        const transformedUsers = usersDetaile.map(userObj => ({
            email: userObj.user.email,
            fullname: userObj.user.fullname
        }));
        const eventDetails = await eventModel.findById(eventId).select('totalAttendance description location title date').lean();

        if (eventDetails) {
            return res.status(STATUS_CODES?.SUCCESS).json({
                message: 'Event details fetched successfully',
                event: eventDetails,
                users: transformedUsers,
                status: true,
            });
        }

        return res.status(STATUS_CODES?.NOT_FOUND).json({
            message: 'Event not found',
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

module.exports = fetchEventAdmin;
