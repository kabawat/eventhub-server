const jwt = require('jsonwebtoken');
const SECRET = require("#src/config/env.config");
const { STATUS_CODES } = require("#src/utils/constants/staticData");

const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: "Authorization token is required.",
            status: false
        });
    }

    const token = authHeader.split(" ")[1];

    // Decode and verify the token
    jwt.verify(token, SECRET.JWT_VERIFY_SECRET, (err, decoded) => {
        if (err) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Invalid or expired token.",
                status: false
            });
        }

        req.userId = decoded.userId;
        next(); // Call the next middleware/controller
    });
};

module.exports = verifyTokenMiddleware;
