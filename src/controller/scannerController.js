// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
const scopeDB = require('../models/scopeDB');
// const { sequelize } = require('../../models');

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

		getBlock: async (req, res) => {},

		getTxList: async (req, res) => {
			const chain = req.params.chain;

			try {
				const result = await scopeDB.getTransactionsInfo();
				return res.json({
					result: result,
				});
			} catch (error) {
				return res.sendStatus(404);
			}
		},

		getTx: async (req, res) => {},
	},
};
