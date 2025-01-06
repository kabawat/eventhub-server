const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");
const { userModel } = require("#src/models");
const bcrypt = require("bcrypt");
const { validateEmail } = require("#src/utils/helper/validation");
const { generateAccessToken } = require("#src/utils/helper/generateToken");

async function registerController(req, res) {
    try {
        const { email, password, fullname } = req.body;

        // Input validation
        const validationErrors = {};
        if (!email || !validateEmail(email)) {
            validationErrors.email = "Please provide a valid email address.";
        }

        if (!password || password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters long.";
        }

        if (Object.keys(validationErrors).length > 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ errors: validationErrors });
        }

        // Generate username from email
        const username = email.split('@')[0];

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(STATUS_CODES.CONFLICT).json({
                message: "User is already registered.",
                status: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            username,
            email,
            fullname,
            password: hashedPassword,
            isVerified: true // without OTP
        });

        await newUser.save();
        const token = generateAccessToken(newUser)
        return res.status(STATUS_CODES.SUCCESS).json({
            message: "User registered successfully.",
            status: true,
            token
        });
    } catch (error) {
        console.error("Error during registration:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: Errors.serverError,
            status: false
        });
    }
}

module.exports = registerController;
