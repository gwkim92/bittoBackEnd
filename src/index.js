const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');
const redis = require('redis');
const dotenv = require('dotenv');
const { Web3 } = require('web3');

const web3ProviderUrl = process.env.WEB3_PROVIDER_URL;
const web3 = new Web3(web3ProviderUrl);
dotenv.config();

app.use(cors());
app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.json());

const redisClient = redis.createClient({ legacyMode: true });
redisClient
	.connect(process.env.REDIS_HOST)
	.then(() => {
		console.log('Redis Connect Success!!');
	})
	.catch((err) => {
		console.log('Redis error : ' + err);
	});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('DB Connect Success!!');
	})
	.catch((err) => {
		console.log(err);
	});

app.post('/', (req, res) => {
	console.log(req.body);
	res.json(req.body);
});

app.use((error, req, res, next) => {
	res.status(err.status || 500);
	res.send(error.message || 'server error');
});

app.use('/users', require('./routes/users'));

<<<<<<< HEAD
app.use('/walletService', require('./walletService/walletService'));
=======
app.use("/walletService", require("./walletService/ethWalletService"));
>>>>>>> 710e8a036722320ba03cf5723c15af00fcd84b09

app.listen(port, () => {
	console.log(`${port} port connect success!!`);
});

module.exports = { web3 };
