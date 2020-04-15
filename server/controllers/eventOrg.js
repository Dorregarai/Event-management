const EventModel = require('../model/eventModel');
const { HTTP_STATUS_CODES } = require('../constants/constants');

function transformEvent({ _doc: event }) {
        return {
            ...event,
            ID: event._id,
            _id: undefined,
            __v: undefined,
        };
}

const asyncController = route => (req, res) => {
    Promise.resolve(route(req, res)).catch(console.error);
};

async function getEventList(req, res) {
    const {
        eventType,
        eventName,
        isFull
    } = req.query;

    const events = await EventModel.getEventList(
        eventType,
        eventName,
        isFull
    );

    res.
        status(HTTP_STATUS_CODES.OK)
        .send({
            events: events.map(transformEvent)
        })
}

async function createEvent(req, res) {
    const {
        eventType,
        eventName,
        date,
        createdOn = new Date(),
        place,
        additionalInfo,
        countOfParticipants = 0
    } = req.body;

    const { error } = EventModel.validateEvent(req.body);
    if(error) {
        return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send(error.details[0].message);
    }

    let event = new EventModel.Event({
        eventType,
        eventName,
        date,
        createdOn,
        place,
        additionalInfo,
        countOfParticipants
    });
    await event.save();
    res.send("OK");
}

async function editEvent(req, res) {
    EventModel
        .editEvent(
            req.body._id,
            req.body.eventType,
            req.body.eventName,
            req.body.date,
            req.body.place,
            req.body.additionalInfo
        )
        .then(() => {
            res
                .status(HTTP_STATUS_CODES.OK)
                .end();
        })
        .catch(error => {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .send({ error });
        });
}

async function removeEvent(req, res) {
    EventModel
        .removeEvent( req.params.id )
        .then(() => {
        res
            .status(HTTP_STATUS_CODES.OK)
            .end();
    })
        .catch(error => {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .send({ error })
        })
}

module.exports = {
    getEventList: asyncController(getEventList),
    createEvent,
    editEvent,
    removeEvent
};