const db = require('../../models');
const block = db.blocks;
const transaction = db.transactions;

async function getBlocksInfo() {
	try {
		const blocks = await block.findAll({
			limit: 5,
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

module.exports = {
	getBlocksInfo,
	getTransactionsInfo,
};
