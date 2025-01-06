const { Router } = require("express")
const router = Router()

const eventRouter = require("./event")
const authRouter = require("./auth")
const adminRouter = require("./admin")

router.use("/events", eventRouter)
router.use("/api", authRouter)
router.use("/admin", adminRouter)

module.exports = router