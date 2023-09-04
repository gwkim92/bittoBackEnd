const dotenv = require('dotenv');
dotenv.config();

const development = {
	databases: {
		accountDB: {
			dialect: 'mysql',
			host: process.env.ACCOUNTDB_HOST,
			port: process.env.ACCOUNTDB_PORT,
			username: process.env.ACCOUNTDB_USERNAME,
			password: process.env.ACCOUNTDB_PASSWORD,
			database: process.env.ACCOUNTDB_NAME,
		},
		contractDB: {
			dialect: 'mysql',
			host: process.env.CONTRACTDB_HOST,
			port: process.env.CONTRACTDB_PORT,
			username: process.env.CONTRACTDB_USERNAME,
			password: process.env.CONTRACTDB_PASSWORD,
			database: process.env.CONTRACTDB_NAME,
		},
	},
};

module.exports = {
	development,
};
