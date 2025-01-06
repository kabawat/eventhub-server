const { Router } = require("express")
const testRouter = Router()
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// /attend API
testRouter.get('/attend', (req, res) => {
    eventEmitter.on('eventTriggered', (data) => {
        console.log('Event triggered:', data);
    });
    res.json({ message: "You have successfully attended the event." });
});

// /event API
testRouter.get('/event', (req, res) => {
    const eventData = {
        eventId: 1,
        eventName: "Sample Event",
        eventDescription: "This is a sample event description."
    };

    res.json(eventData);
});

module.exports = testRouter