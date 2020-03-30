const EventModel = require('../model/eventModel');
const UserModel = require('../model/userModel');
const { HTTP_STATUS_CODES, PER_PAGE } = require('../constants/constants');

async function getUsers(req, res) {
    const user = await UserModel.User.findById(req.user._id).select('-password');
    res.send(user);
}

async function registrateUser(req, res) {
    // validate the request body first
    const { error } = UserModel.validateUser(req.body);
    if(error) {
        return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send(error.details[0].message);
    }

    //find an existing user
    let user = await UserModel.User.findOne({ name: req.body.name });
    if(user) return res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .send('User already exists');

    user = new UserModel.User({
        name: req.body.name,
        password: req.body.password,
        eventList: req.body.eventList
    });
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: user._id,
        name: user.name,
        eventList: user.eventList
    });
}

async function authorization(req, res){
    console.log(req.body);
    const { error } = UserModel.validateUser(req.body);
    if(error) {
        return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send(error.details[0].message);
    }

    let user = await UserModel.User.findOne({ name: req.body.name, password: req.body.password });
    if(!user) return res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .send('Check input!');

    console.log('Logged successful');
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: user._id,
        name: user.name,
        tracklist: user.tracklist
    });
}

async function logout(req, res) {
    console.log(req.body);

}


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
        page,
        perPage: originalPerPage = PER_PAGE.EVENTS_PER_PAGE,
        eventType,
        eventName,
        isFull
    } = req.query;

    if (page === undefined) {
        res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send({ error: '\'page\' is required' });
        return;
    }
    if (originalPerPage === undefined) {
        res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send({ error: '\'perPage\' is required' });
        return;
    }
    if (page < 1) {
        res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send({ error: '\'page\' should be greater than 0' });
        return;
    }

    const perPage = Math.min(+originalPerPage);

    const events = await EventModel.getEventList(
        eventType,
        eventName,
        page - 1, // MongoDB pagination starts from 0!!!
        perPage,
        isFull
    );

    const eventsCount = (await EventModel.getEventList(
        0,
        0,
        eventType,
        isFull
    )).length;

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

    console.log(req.body);

    // validate the request body first
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

/*function subscribeEvent(req, res) {
    console.log(req.params);
    EventModel.subscribeEvent(req.params.id)
        .then(() => {
            res
                .status(HTTP_STATUS_CODES.OK)
                .end();
        })
        .catch(error => {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .send({ error });
        })
}*/

module.exports = {
    getUsers,
    registrateUser,
    authorization,
    getEventList: asyncController(getEventList),
    //subscribeEvent,
    createEvent
};