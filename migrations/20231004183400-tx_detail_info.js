'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tx_detail_info', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			hash: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			block_number: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			timestamp: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			method: {
				type: Sequelize.STRING(10),
				allowNull: true,
			},
			from_address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			to_address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			value: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transaction_fee: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gas_price: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gas_limit: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gas_fees_base: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gas_fees_max: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gas_fees_max_priority: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			burnt: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			txn_savings_fees: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gas_used: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			nonce: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			tx_type: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			input_data: {
				type: Sequelize.TEXT('long'),
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('tx_detail_info');
	},
};
