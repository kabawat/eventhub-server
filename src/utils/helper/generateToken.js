const SECRET = require("#src/config/env.config");
const jwt = require("jsonwebtoken");
function generateVerificationToken(userId) {
    const payload = { userId };
    const secretKey = SECRET.JWT_VERIFY_SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
}
function generateAccessToken(user) {
    const payload = { user_id: user._id, username: user.username };
    const secretKey = SECRET?.JWT_ACCESS_SECRET;
    const options = { expiresIn: '24h' };
    return jwt.sign(payload, secretKey, options);
}

module.exports = { generateVerificationToken, generateAccessToken }