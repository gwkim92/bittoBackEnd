const mysql = require('mysql');
const Sequelize = require('sequelize');

// mysql accountDB connect
// const sequelize = new Sequelize('accountDB', 'root', 'qwer1234', {
// 	host: 'localhost',
// 	dialect: 'mysql',
// 	logging: false,
// });

const sequelize = new Sequelize('accountDB', 'root', 'qwer1234', {
	host: '127.0.0.1',
	port: '3306',
	dialect: 'mysql',
	logging: false,
});

sequelize
	.authenticate()
	.then(() => {
		console.log(
			'Connection to the database has been established successfully.'
		);
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});

// accountInfo table define
const AccountInfo = sequelize.define('account_info', {
	name: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true,
		// Handle trimming at the application level before saving
	},
	password: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: [5, 255],
		},
	},
	role: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	walletPassword: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	walletAddress: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	image: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
});

console.log(AccountInfo === sequelize.models.AccountInfo);

// Sync the model with the DB
AccountInfo.sync()
	.then(() => {
		console.log('AccountInfo table synced with database.');
	})
	.catch((err) => {
		console.error(
			'Error syncing the AccountInfo table with database:',
			err
		);
		return;
	});

async function GetUsersInfo() {
	// AccountInfo.findAll().then((users) => {
	// 	console.log('users : ', users);
	// 	return users;
	// });
	// console.log('account info : ', AccountInfo.findAll());
	// return AccountInfo.findAll();

	try {
		const users = await AccountInfo.findAll();
		return users;
	} catch (error) {
		console.error('Error retreving users : ', error);
		return [];
	}
}

function GetUserInfo() {
	return AccountInfo.findOne({
		where: { email: 'john.doe@example.com' },
	}).then((account) => {
		console.log('found account : ', account);
	});
}

module.exports = {
	AccountInfo,
	GetUsersInfo,
	GetUserInfo,
};
