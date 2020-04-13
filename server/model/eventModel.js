const mongoose = require('mongoose');
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const EventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ['MEETING', 'TEA PARTY', 'WEDDING', 'BIRTHDAY', 'OTHER'],
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    place: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    },
    isView: {
        type: Boolean,
        default: true
    },
});

function validateEvent(event) {
    const schema = Joi.object({
        eventType: Joi.string().required(),
        eventName: Joi.string().required(),
        date: Joi.date().format('YYYY-MM-DD').raw().required(),
        createdOn: Joi.date().format('YYYY-MM-DD').raw(),
        place: Joi.string().required(),
        additionalInfo: Joi.string(),
        isView: Joi.boolean(),
    });
    return schema.validate(event);
}

const Event = mongoose.model('Event', EventSchema);

function getEventList(eventType, eventName){
    const query = { isView: true };
    if (eventType !== undefined) query.eventType = eventType;
    if (eventName !== undefined) query.eventName = eventName;

    const field = null;
    return Event.find(query, field)
}

function editEvent(id, eventType, eventName, date, place, additionalInfo) {
    const query = { _id: id };
    const modification = { $set: { eventType, eventName, date, place, additionalInfo }};
    return Event.updateOne(query, modification);
}

function removeEvent(id) {
    const query = { _id: id };
    //const modification = { $set: { removed: true } };
    return Event.updateOne(query, { $set: { isView: false }})
}

/*function subscribeEvent(id) {
    const query = { _id: id };
    const modification = { $set: { countOfParticipants: + 1 } };
    return Event.updateOne(query, modification)
}*/

module.exports = {
    Event,
    validateEvent,
    getEventList,
    editEvent,
    removeEvent
    //subscribeEvent,
};