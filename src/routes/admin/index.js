const AdminLoginController = require("#src/controllers/auth/loginAsAdmin")
const adminProfileController = require("#src/controllers/profile/admin")
const verifyAdminMiddleware = require("#src/middleware/adminAuth")
const { Router } = require("express")
const adminRouter = Router()

adminRouter.post("/login", AdminLoginController)
adminRouter.get("/profile", verifyAdminMiddleware, adminProfileController)

module.exports = adminRouter