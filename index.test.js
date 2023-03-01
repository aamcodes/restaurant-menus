const { sequelize } = require('./db');
const { Restaurant, Menu } = require('./models/index');
const { seedRestaurant, seedMenu } = require('./seedData');

describe('Restaurant and Menu Models', () => {
	/**
	 * Runs the code prior to all tests
	 */
	beforeAll(async () => {
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
		console.log(foundRestaurant);
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
