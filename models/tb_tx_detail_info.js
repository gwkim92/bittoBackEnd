'use strict';

module.exports = (sequelize, DataTypes) => {
	const TxDetailInfo = sequelize.define(
		'tx_detail_info',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			hash: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			block_number: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			timestamp: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			method: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			from_address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			to_address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			value: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			transaction_fee: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gas_price: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gas_limit: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gas_fees_base: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gas_fees_max: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gas_fees_max_priority: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			burnt: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			txn_savings_fees: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gas_used: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nonce: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			tx_type: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			input_data: {
				type: DataTypes.TEXT('long'),
				allowNull: true,
			},
		},
		{
			timestamps: false,
			tableName: 'tx_datail_info',
		}
	);

	return TxDetailInfo;
};
