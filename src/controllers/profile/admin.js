const { userModel } = require("#src/models");
const { STATUS_CODES } = require("#src/utils/constants/staticData");
const mongoose = require('mongoose')
async function adminProfileController(req, res) {
    try {
        const id = new mongoose.Types.ObjectId(req.user_id)
        const user = await userModel.findOne({ _id: id, isStaff: true }).select('-password -otp -otpExpire').lean()
        if (!user) {
            return res.status(STATUS_CODES?.NOT_FOUND).json({ error: 'User not found' });
        }

        res.status(STATUS_CODES?.SUCCESS).json({ profile: user, status: true });
    } catch (err) {
        res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}
module.exports = adminProfileController