const LoginController = require("#src/controllers/auth/login")
const verifyOtpController = require("#src/controllers/auth/otpVerify")
const registerController = require("#src/controllers/auth/register")
const userProfileController = require("#src/controllers/profile/user")
const verifyAccessTokenMiddleware = require("#src/middleware/authMiddleware")
const verifyTokenMiddleware = require("#src/middleware/verifyAuthToken")
const { Router } = require("express")
const authRouter = Router()

authRouter.post("/register", registerController)
authRouter.post("/verify-otp", verifyTokenMiddleware, verifyOtpController)
authRouter.post("/login", LoginController)
authRouter.get("/profile", verifyAccessTokenMiddleware, userProfileController)

module.exports = authRouter