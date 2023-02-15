const { ADMIN, USER, GUEST } = require('../config/constants');

const roleTypes = {};

roleTypes.isAdmin = (type) => type.toString().toUpperCase() === ADMIN;
roleTypes.isUser = (type) => type.toString().toUpperCase() === USER;
roleTypes.isGuest = (type) => type.toString().toUpperCase() === GUEST;

module.exports = roleTypes;
