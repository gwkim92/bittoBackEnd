'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const accountDB = {};
accountDB.account_infos = require('./tb_account_info');

const contractDB = {};
contractDB.address_infos = require('./address_info');
contractDB.contract_infos = require('./contract_info');

const scopeDB = {};
scopeDB.blocks = require('./tb_blocks');
scopeDB.transactions = require('./tb_transactions');
scopeDB.uncles = require('./tb_uncles');
scopeDB.withdrawals = require('./tb_withdrawals');
scopeDB.TxDetailInfo = require('./tb_tx_detail_info');

const createSequelizeInstance = (dbConfig) => {
	if (dbConfig.use_env_variable) {
		return new Sequelize(process.env[config.use_env_variable], dbConfig);
	} else {
		return new Sequelize(
			dbConfig.database,
			dbConfig.username,
			dbConfig.password,
			{
				host: dbConfig.host,
				port: dbConfig.port,
				dialect: dbConfig.dialect,
				operatorsAliases: false,
			}
		);
	}
};

const sequelizeAccountDB = createSequelizeInstance(config.databases.accountDB);
const sequelizeContractDB = createSequelizeInstance(
	config.databases.contractDB
);
const sequelizeScopeDB = createSequelizeInstance(config.databases.scopeDB);

Object.keys(accountDB).forEach((modelName) => {
	const model = accountDB[modelName](sequelizeAccountDB, Sequelize.DataTypes);
	db[modelName] = model;
});

Object.keys(contractDB).forEach((modelName) => {
	const model = contractDB[modelName](
		sequelizeContractDB,
		Sequelize.DataTypes
	);
	db[modelName] = model;
});

Object.keys(scopeDB).forEach((modelName) => {
	const model = scopeDB[modelName](sequelizeScopeDB, Sequelize.DataTypes);
	db[modelName] = model;
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelizeAccountDB = sequelizeAccountDB;
db.sequelizeContractDB = sequelizeContractDB;
db.sequelizeScopeDB = sequelizeScopeDB;
db.Sequelize = Sequelize;

sequelizeAccountDB
	.sync({ force: false })
	.then(() => {
		console.log('AccountDB: Mysql Database Connect Success!!');
	})
	.catch((err) => {
		console.error('AccountDB: ', err);
		return;
	});

sequelizeContractDB
	.sync({ force: false })
	.then(() => {
		console.log('ContractDB: Mysql Database Connect Success!!');
	})
	.catch((err) => {
		console.error('ContractDB: ', err);
		return;
	});

sequelizeScopeDB
	.sync({ force: false })
	.then(() => {
		console.log('ScopeDB: Mysql Database Connect Success!!');
	})
	.catch((err) => {
		console.error('ScopeDB: ', err);
		return;
	});

module.exports = db;
