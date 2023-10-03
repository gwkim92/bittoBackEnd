const scopeDB = require('../models/scopeDB');
// TODO: response error code 수정 및 정리

module.exports = {
	scan: {
		getBlockList: async (req, res) => {
			// TODO chain 별 scopeDB 에 블록데이터 저장 후 분기
			const chain = req.params.chain;

			try {
				const result = await scopeDB.getBlocksInfo();
				return res.json({
					result: result,
				});
			} catch (error) {
				return res.sendStatus(404);
			}
		},

		getBlock: async (req, res) => {
			const chain = req.params.chain;
			const blockNumber = req.params.number;

			try {
				const result = await scopeDB.getBlockByNumber(blockNumber);
				return res.json({
					result: result,
				});
			} catch (error) {
				return res.sendStatus(404);
			}
		},

		getTxList: async (req, res) => {
			// TODO chain 별 scopeDB 에 블록데이터 저장 후 분기
			const chain = req.params.chain;

			try {
				const result = await scopeDB.getTransactionsDetailInfo();
				return res.json({
					result: result,
				});
			} catch (error) {
				return res.sendStatus(404);
			}
		},

		getTx: async (req, res) => {
			// TODO chain 별 scopeDB 에 블록데이터 저장 후 분기
			const chain = req.params.chain;
			const hash = req.params.hash;

			try {
				const result = await scopeDB.getTransactionInfoByHash(hash);
				return res.json({
					result: result,
				});
			} catch (error) {
				return res.sendStatus(404);
			}
		},
	},
};
