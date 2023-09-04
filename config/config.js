const dotenv = require("dotenv");
dotenv.config();

// const development = {
// 	dialect: 'mysql',
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
// 	username: process.env.USER_NAME,
// 	password: process.env.USER_PASS,
// 	database: process.env.DB_NAME,
// };

const accountDB = {
  dialect: "mysql",
  host: process.env.ACCOUNTDB_HOST,
  port: process.env.ACCOUNTDB_PORT,
  username: process.env.ACCOUNTDB_USERNAME,
  password: process.env.ACCOUNTDB_PASSWORD,
  database: process.env.ACCOUNTDB_NAME,
};

const contractDB = {
  username: process.env.HARDHAT_USERNAME,
  password: process.env.HARDHAT_PASSWORD,
  database: process.env.HARDHAT_NAME,
  host: process.env.HARDHAT_HOST,
  dialect: "mysql",
};

module.exports = {
  development: accountDB,
  contractDB,
};
