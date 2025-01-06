const SECRET = require("#src/config/env.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Errors, STATUS_CODES } = require("#src/utils/constants/staticData");
const { userModel } = require("#src/models");

async function LoginController(req, res) {
    const { loginIdentifier, password } = req.body;

    try {
        if (!loginIdentifier || !password) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({
                message: "Username and password are required",
                status: false
            });
        }

        let user = await userModel.findOne({ username: loginIdentifier, isVerified: true, isStaff: true }, "email username password");

        if (!user) {
            return res.status(STATUS_CODES?.NOT_FOUND).json({ message: "User not found", status: false });
        }

        // Compare the entered password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(STATUS_CODES?.BAD_REQUEST).json({ message: "Invalid credentials", status: false });
        }

        // JWT token 
        const token = jwt.sign({ user_id: user._id, username: user.username }, SECRET.JWT_ADMIN_SECRET);
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
