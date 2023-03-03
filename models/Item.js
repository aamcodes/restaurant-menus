const { sequelize, Sequelize } = require('../db');

// TODO - create a Menu model
const Item = sequelize.define('items', {
	name: Sequelize.STRING,
	image: Sequelize.STRING,
	price: Sequelize.INTEGER,
	vegetarian: Sequelize.BOOLEAN,
});

module.exports = { Item };
