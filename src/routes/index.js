const { Router } = require("express")
const router = Router()

const eventRouter = require("./event")
const authRouter = require("./auth")
const adminRouter = require("./admin")
const testRouter = require("./test")

router.use("/events", eventRouter)
router.use("/api", authRouter)
router.use("/admin", adminRouter)
router.use("/test", testRouter)

module.exports = router