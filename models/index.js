const { Restaurant } = require('./Restaurant');
const { Menu } = require('./Menu');
const { Item } = require('./Item');

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);

Items.belongsToMany(Menu, { through: 'menu_items' });
Menu.belongsToMany(Items, { through: 'menu_items' });

module.exports = { Restaurant, Menu, Item };
