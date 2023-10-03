const db = require('../../models');
const block = db.blocks;
const transaction = db.transactions;
const txDetailInfo = db.txDetailInfo;

async function getBlocksInfo() {
	try {
		const blocks = await block.findAll({
			limit: 6,
			order: [['id', 'DESC']],
		});
		return blocks;
	} catch (err) {
		console.log('error : ', err);
		return [];
	}
}

async function getTransactionsInfo() {
	try {
		const txs = await transaction.findAll({
			limit: 6,
			order: [['id', 'DESC']],
		});
		return txs;
	} catch (err) {
		console.log('error : ', err);
		return [];
	}
}

async function getTransactionsDetailInfo() {
	try {
		const txDetails = await txDetailInfo.findAll({
			limit: 6,
			order: [['id', 'DESC']],
		});
		return txDetails;
	} catch (err) {
		console.log('error : ', err);
		return [];
	}
}

async function getBlockByNumber(number) {
	try {
		const blockInfo = await block.findOne({ where: { number: number } });
		if (blockInfo === null) {
			return null;
		} else {
			return blockInfo;
		}
	} catch (err) {
		console.log('error : ', err);
		return null;
	}
}

async function getTransactionInfoByHash(hash) {
	try {
		const txInfo = await txDetailInfo.findOne({ where: { hash: hash } });
		if (txInfo === null) {
			return null;
		} else {
			return txInfo;
		}
	} catch (err) {
		console.log('error : ', err);
		return null;
	}
}

module.exports = {
	getBlocksInfo,
	getTransactionsInfo,
	getTransactionsDetailInfo,
	getBlockByNumber,
	getTransactionInfoByHash,
};
