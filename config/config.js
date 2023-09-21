const dotenv = require('dotenv');
dotenv.config();

const development = {
	databases: {
		accountDB: {
			host: process.env.ACCOUNTDB_HOST,
			port: process.env.ACCOUNTDB_PORT,
			username: process.env.ACCOUNTDB_USERNAME,
			password: process.env.ACCOUNTDB_PASSWORD,
			database: process.env.ACCOUNTDB_NAME,
			dialect: 'mysql',
		},
		contractDB: {
			host: process.env.CONTRACTDB_HOST,
			port: process.env.CONTRACTDB_PORT,
			username: process.env.CONTRACTDB_USERNAME,
			password: process.env.CONTRACTDB_PASSWORD,
			database: process.env.CONTRACTDB_NAME,
			dialect: 'mysql',
		},
		scopeDB: {
			host: process.env.SCOPEDB_HOST,
			port: process.env.SCOPEDB_PORT,
			username: process.env.SCOPEDB_USERNAME,
			password: process.env.SCOPEDB_PASSWORD,
			database: process.env.SCOPEDB_NAME,
			dialect: 'mysql',
		},
	},
};

module.exports = {
	development,
};
