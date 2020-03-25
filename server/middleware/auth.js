const jwt = require('jsonwebtoken');
const config = require('config');
const { HTTP_STATUS_CODES } = require('../constants/constants');

module.exports = function (req, res, next) {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if(!token) {
        return res
            .status(HTTP_STATUS_CODES.UNAUTHORIZED)     //401
            .send('Access denied. No token provided.')
    }
    try {
        //if can verify the token, set req.user and pass to next middleware
        let decoded;
        decoded = jwt.verify(token, config.get("myprivatekey"));
        req.user = decoded;
        next();
    } catch (ex) {
        //if token is invalid
        res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)      //400
            .send('Invalid token.')
    }
};