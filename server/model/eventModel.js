const mongoose = require('mongoose');
const JoiBase = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');

const Joi = JoiBase.extend(JoiDate);

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
        type: Date,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    place: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    },
    isRemoved: {
        type: Boolean,
        default: false
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

function getEventList(date){
    let now = new Date();
    if(date === undefined) date = now.setHours(0, 0, 0, 0);

    const query = { date: { $gt: date } };

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
    return Event.updateOne(query, { $set: { isRemoved: true }})
}

module.exports = {
    Event,
    validateEvent,
    getEventList,
    editEvent,
    removeEvent
};
