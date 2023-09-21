const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 4000;
const dotenv = require('dotenv');

const model = require('./models/index');

dotenv.config();

app.use(cors());
app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.json());

model.NewRepositories;

app.post('/', (req, res) => {
	console.log(req.body);
	res.json(req.body);
});

app.use((error, req, res, next) => {
	res.status(err.status || 500);
	res.send(error.message || 'server error');
});

// TODO router root 수정
app.use('/users', require('./routes/users'));
app.use('/scan', require('./routes/scan'));
app.use('/transactions', require('./routes/eth/transactions'));
app.use('/walletService', require('./walletService/ethWalletService'));

// TODO server connect 순서 수정
app.listen(port, () => {
	console.log(`${port} port connect success!!`);
});

// TODO health check 추가

// module.exports = { web3 };
