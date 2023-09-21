'use strict';

module.exports = (sequelize, DataTypes) => {
	const Uncle = sequelize.define(
		'uncles',
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
			uncle: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			timestamps: false,
			tableName: 'uncles',
		}
	);

	return Uncle;
};
