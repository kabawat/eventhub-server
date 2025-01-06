const { Router } = require("express")
const eventRouter = Router()

const fetchAllEventController = require("#src/controllers/event/fetchEvents")
const createEventController = require("#src/controllers/event/createEvent")
const updateEventController = require("#src/controllers/event/updateEvent")
const softDeleteEventController = require("#src/controllers/event/deleteEvent")
const verifyAdminMiddleware = require("#src/middleware/adminAuth")
const AttendEventController = require("#src/controllers/event/attendEvent")
const verifyAccessTokenMiddleware = require("#src/middleware/authMiddleware")
const fetchEvent = require("#src/controllers/event/fetchEvent")
const fetchEventAdmin = require("#src/controllers/event/fetchEventAdmin")


eventRouter.post("/", verifyAdminMiddleware, createEventController)
eventRouter.put("/:id", verifyAdminMiddleware, updateEventController)
eventRouter.delete("/:id", verifyAdminMiddleware, softDeleteEventController)

eventRouter.get("/", fetchAllEventController)
eventRouter.post("/:id/attend", verifyAccessTokenMiddleware, AttendEventController)
eventRouter.get("/:id", verifyAccessTokenMiddleware, fetchEvent)
eventRouter.get("/:id/admin", verifyAdminMiddleware, fetchEventAdmin)

module.exports = eventRouter