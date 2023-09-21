'use strict';

module.exports = (sequelize, DataTypes) => {
	const Block = sequelize.define(
		'blocks',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			base_fee_per_gas: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			difficulty: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			extra_data: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			gas_limit: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			gas_used: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			hash: {
				type: DataTypes.STRING(255),
				allowNull: true,
				unique: true,
			},
			logs_bloom: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			miner: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			mix_hash: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			nonce: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			number: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			parent_hash: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			receipts_root: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			sha_3_uncles: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			size: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			state_root: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			timestamp: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			total_difficulty: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			transactions_root: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			withdrawals_root: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			timestamps: false,
			tableName: 'blocks',
		}
	);

	return Block;
};
