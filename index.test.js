const { sequelize } = require('./db');
const { Restaurant, Menu, Item } = require('./models/index');
const { seedRestaurant, seedMenu } = require('./seedData');

describe('Restaurant and Menu Models', () => {
	/**
	 * Runs the code prior to all tests
	 */
	beforeEach(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the
		// test suite is run
		await sequelize.sync({ force: true });
	});

	test('can create a Restaurant', async () => {
		// TODO - write test
		let restaurant = await Restaurant.create({
			name: 'Benihana',
			location: 'New Jersey',
			cuisine: 'Japanese',
		});
		expect(restaurant).toBeInstanceOf(Object);
		expect(restaurant.name).toBe('Benihana');
		expect(restaurant.location).toBe('New Jersey');
		expect(restaurant.cuisine).toBe('Japanese');
	});

	test('can create a Menu', async () => {
		// TODO - write test
		let menu = await Menu.create({
			title: 'Rockys Choice',
		});
		expect(menu).toBeInstanceOf(Object);
		expect(menu.title).toBe('Rockys Choice');
	});

	test('can find Restaurants', async () => {
		// TODO - write test
		let restaurant = await Restaurant.create({
			name: 'Benihana',
			location: 'New Jersey',
			cuisine: 'Japanese',
		});
		let foundRestaurant = await Restaurant.findOne({
			where: { name: 'Benihana' },
		});
		expect(foundRestaurant).toBeInstanceOf(Object);
		expect(foundRestaurant.name).toEqual('Benihana');
	});

	test('can find Menus', async () => {
		// TODO - write test
		let menu = await Menu.create({
			title: 'Rockys Choice',
		});
		let foundMenu = await Menu.findOne({
			where: { title: 'Rockys Choice' },
		});
		expect(foundMenu).toBeInstanceOf(Object);
		expect(foundMenu.title).toEqual('Rockys Choice');
	});

	test('can delete Restaurants', async () => {
		// TODO - write test
		let restaurant = await Restaurant.create({
			name: 'Benihana',
			location: 'New Jersey',
			cuisine: 'Japanese',
		});
		expect(restaurant).toBeInstanceOf(Object);
		await Restaurant.destroy({
			where: { name: 'Benihana' },
		});
		let foundRestaurant = Restaurant.findOne({
			where: { name: 'Benihana' },
		});
		let objectSize = Object.keys(foundRestaurant).length;
		expect(objectSize).toBe(0);
	});
});

describe('Restaurant, Menu and Item Relationship Associations', () => {
	beforeEach(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the
		// test suite is run
		await sequelize.sync({ force: true });
	});

	test('relationships and associations are working properly', async () => {
		let restaurant = await Restaurant.create({
			name: 'Benihana',
			location: 'New Jersey',
			cuisine: 'Japanese',
		});

		let menu = await Menu.create({
			title: 'Rockys Choice',
		});

		let carrot = await Item.create({
			name: 'Carrot',
			image: 'carrot image',
			price: 1000,
			vegetarian: true,
		});
		let egg = await Item.create({
			name: 'Egg',
			image: 'egg image',
			price: 1000,
			vegetarian: false,
		});

		let foundRestaurant = await Restaurant.findByPk(
			restaurant.dataValues.id
		);

		let foundMenu = await Menu.findByPk(menu.dataValues.id);

		let foundCarrot = await Item.findByPk(carrot.dataValues.id);

		let foundEgg = await Item.findByPk(egg.dataValues.id);

		await foundRestaurant.addMenu(foundMenu.dataValues.id);
		await foundMenu.addItem(foundCarrot.dataValues.id);
		await foundMenu.addItem(foundEgg.dataValues.id);

		let data = await Menu.findAll({
			include: [{ model: Restaurant }, { model: Item, as: 'items' }],
		});
		console.log(data);
		expect(data[0].dataValues.title).toBe('Rockys Choice');
		expect(data[0].dataValues.items.length).toBe(2);
		expect(data[0].dataValues.restaurant.dataValues.name).toBe('Benihana');
	});
});
