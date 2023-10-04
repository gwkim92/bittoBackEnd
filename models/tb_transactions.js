'use strict';

module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define(
		'transactions',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			block_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'blocks',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			transaction: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			timestamps: false,
			tableName: 'transactions',
		}
	);

	return Transaction;
};
