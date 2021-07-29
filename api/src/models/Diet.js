const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('diet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
			unique: true,
      primaryKey: true
    },
  });
};