const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const JwtHelper = {};

JwtHelper.handleError = (error) => {
    const { message } = error;
    switch (message) {
        case 'invalid signature':
            return 'Token cannot be verified. Please try again with a different token';
        case 'jwt expired':
            return 'Your token has expired please login again to continue';
        default:
            return message;
    }
};

JwtHelper.generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_TOKEN_SECRET || config.JWT_SECRET,
        {
            expiresIn:
                process.env.JWT_TOKEN_EXPIRES_IN || config.JWT_EXPIRES_IN,
        }
    );
};

JwtHelper.generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET || config.JWT_REFRESH_SECRET,
        {
            expiresIn:
                process.env.JWT_REFRESH_TOKEN_EXPIRES_IN ||
                config.JWT_REFRESH_EXPIRES_IN,
        }
    );
};

module.exports = JwtHelper;
