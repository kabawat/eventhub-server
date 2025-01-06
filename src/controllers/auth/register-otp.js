const { STATUS_CODES, Errors } = require("#src/utils/constants/staticData");
const { userModel } = require("#src/models");
const { sendEmail } = require("#src/services/sendEmail");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const { generateVerificationToken } = require("#src/utils/helper/generateToken");
const { validateEmail } = require("#src/utils/helper/validation");

// Helper function to generate and hash OTP
async function generateOtp() {
    const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true
    });
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpire = new Date(Date.now() + 60 * 60 * 1000);
    return { otp, hashedOtp, otpExpire };
}

// Optimized Register Controller
async function registerController(req, res) {
    try {
        const { username, email, password } = req.body;

        // Input validation
        const validationErrors = {};
        if (!username || username.trim().length < 3) {
            validationErrors.username = "Username must be at least 3 characters long.";
        }

        if (!email || !validateEmail(email)) {
            validationErrors.email = "Please provide a valid email address.";
        }

        if (!password || password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters long.";
        }

        if (Object.keys(validationErrors).length > 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ errors: validationErrors });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            if (!existingUser.isVerified) {
                // Generate OTP asynchronously
                (async () => {
                    try {
                        const { otp, hashedOtp, otpExpire } = await generateOtp();
                        existingUser.otp = hashedOtp;
                        existingUser.otpExpire = otpExpire;
                        await existingUser.save();

                        const context = { name: existingUser.username || username, otp };
                        await sendEmail(email, 'OTP for Registration', 'OTP_REGISTRATION', context);
                    } catch (otpError) {
                        console.error("Failed to send OTP:", otpError);
                    }
                })();

                // Respond immediately
                const token = generateVerificationToken(existingUser._id);
                return res.status(STATUS_CODES.SUCCESS).json({
                    message: "OTP is being sent to your email for verification.",
                    status: true,
                    token
                });
            }

            return res.status(STATUS_CODES.CONFLICT).json({
                message: "User is already registered and verified.",
                status: false
            });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP asynchronously
        const { otp, hashedOtp, otpExpire } = await generateOtp();

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            otp: hashedOtp,
            otpExpire
        });

        await newUser.save();

        // Generate verification token
        const token = generateVerificationToken(newUser._id);

        // Send OTP email asynchronously
        (async () => {
            try {
                const context = { name: username, otp };
                await sendEmail(email, 'OTP for Registration', 'OTP_REGISTRATION', context);
            } catch (emailError) {
                console.error("Failed to send OTP email:", emailError);
            }
        })();

        // Respond immediately with the token
        return res.status(STATUS_CODES.SUCCESS).json({
            message: "User registered successfully. OTP is being sent to your email.",
            token,
            status: true
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
