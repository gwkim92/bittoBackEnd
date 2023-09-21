'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('withdrawals', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			block_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'blocks',
					key: 'id',
				},
			},
			address: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			amount: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			withdrawal_index: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			validator_index: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('withdrawals');
	},
};
