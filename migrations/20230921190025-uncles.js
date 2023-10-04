'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('uncles', {
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
				onDelete: 'CASCADE',
			},
			uncle: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('uncles');
	},
};
