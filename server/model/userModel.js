const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    eventList: {
        type: Array
    }
});

UserSchema.methods.generateAuthToken = function() {
    let token;
    token = jwt.sign({
            _id: this._id,
        },
        config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
};

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required(),
        //repeatPassword: Joi.ref('password').required(),
        eventList: Joi.array()
    };
    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validateUser
};