'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('blocks', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			base_fee_per_gas: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			difficulty: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			extra_data: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			gas_limit: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			gas_used: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			hash: {
				type: Sequelize.STRING(255),
				allowNull: true,
				unique: true,
			},
			logs_bloom: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			miner: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			mix_hash: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			nonce: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			number: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			parent_hash: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			receipts_root: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			sha_3_uncles: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			size: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			state_root: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			timestamp: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			total_difficulty: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			transactions_root: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			withdrawals_root: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('blocks');
	},
};
