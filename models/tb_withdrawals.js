'use strict';

module.exports = (sequelize, DataTypes) => {
	const Withdrawal = sequelize.define(
		'withdrawals',
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
			},
			address: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			amount: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			withdrawal_index: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			validator_index: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			timestamps: false,
			tableName: 'withdrawals',
		}
	);

	return Withdrawal;
};
