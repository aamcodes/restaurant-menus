const { sequelize } = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Restaurant model
const Restaurant = sequelize.define('restaurants', {
	name: Sequelize.STRING,
	location: Sequelize.STRING,
	cuisine: Sequelize.STRING,
});

module.exports = { Restaurant };
