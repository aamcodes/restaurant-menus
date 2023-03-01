const { sequelize, Sequelize } = require('../db');

// TODO - create a Menu model
const Menu = sequelize.define('menus', {
	title: Sequelize.STRING,
});

module.exports = { Menu };
