const SECRET = require("#src/config/env.config");
const bcrypt = require("bcrypt");  // Import bcrypt
const jwt = require("jsonwebtoken");
const { Errors, STATUS_CODES } = require("#src/utils/constants/staticData");
const { validateEmail } = require("#src/utils/helper/validation");
const { userModel } = require("#src/models");

async function LoginController(req, res) {
    const { loginIdentifier, password } = req.body;
    try {
        if (!loginIdentifier || !password) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                message: "Username/Email and password are required",
                status: false
            });
        }

        let user;
        if (validateEmail(loginIdentifier)) {
            user = await userModel.findOne({ email: loginIdentifier, isVerified: true }, "email username password");
        } else {
            user = await userModel.findOne({ username: loginIdentifier, isVerified: true }, "email username password");
        }

        if (!user) {
            return res.status(STATUS_CODES?.NOT_FOUND).json({ message: "User not found", status: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({ message: "Invalid credentials", status: false });
        }

        // JWT token 
        const token = jwt.sign({ user_id: user._id, username: user.username }, SECRET.JWT_ACCESS_SECRET);
        res.status(STATUS_CODES?.SUCCESS).json({
            message: "Login successful",
            status: true,
            token
        });

    } catch (error) {
        res.status(STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
            message: Errors?.serverError,
            status: false,
            error: error?.message
        });
    }
}

module.exports = LoginController;
