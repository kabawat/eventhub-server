const bcrypt = require('bcrypt');
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");
const { userModel } = require("#src/models");
const { generateAccessToken } = require('#src/utils/helper/generateToken');

const verifyOtpController = async (req, res) => {
    try {
        const { otp } = req.body;
        const userId = req.userId;

        // Input validation
        if (!otp) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "OTP is required.",
                status: false
            });
        }

        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: "User not found.",
                status: false
            });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            return res.status(STATUS_CODES.CONFLICT).json({
                message: "User is already verified.",
                status: false
            });
        }

        // Check if OTP has expired
        if (user.otpExpire < new Date()) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "OTP has expired. Please request a new one.",
                status: false
            });
        }

        // Verify OTP
        const isOtpValid = await bcrypt.compare(otp, user.otp);
        if (!isOtpValid) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Invalid OTP. Please try again.",
                status: false
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpire = null;
        await user.save();

        const token = generateAccessToken(user)
        return res.status(STATUS_CODES.SUCCESS).json({
            message: "OTP verified successfully. Your account is now verified.",
            status: true,
            token: token
        });
    } catch (error) {
        console.error("Error during OTP verification:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Errors.serverError,
            status: false
        });
    }
};

module.exports = verifyOtpController;
