'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('account_infos', {
			userId: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					len: [5, 255],
				},
			},
			role: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			walletPassword: {
				type: Sequelize.STRING(50),
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			walletAddress: {
				type: Sequelize.STRING(50),
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			image: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('account_infos');
	},
};
