const jwt = require('jsonwebtoken');
const SECRET = require("#src/config/env.config");
const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");
const { userModel } = require('#src/models');

const verifyAdminMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Authorization token is required.",
                status: false
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Authorization token is missing.",
                status: false
            });
        }

        let decoded;
        try {
            decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, SECRET.JWT_ADMIN_SECRET, (err, decodedToken) => {
                    if (err) reject(err);
                    else resolve(decodedToken);
                });
            });
        } catch (err) {
            let errorMessage = Errors?.invalidToken;
            if (err?.name === 'TokenExpiredError') {
                errorMessage = Errors?.tokenExpired;
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: errorMessage,
                status: false
            });
        }

        const isExists = await userModel.exists({ _id: decoded.user_id, isStaff: true }).lean()
        if (!isExists) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: Errors?.invalidToken,
                status: false
            });
        }

        req.user_id = isExists._id
        next();
    } catch (err) {
        console.error("Error during token verification:", err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: "An unexpected error occurred during token verification.",
            status: false
        });
    }
};

module.exports = verifyAdminMiddleware;
