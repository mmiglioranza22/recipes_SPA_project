const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    scoring: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    healthyness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  });
};
