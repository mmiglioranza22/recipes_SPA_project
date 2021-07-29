const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    dietTypes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    }
  });
};
