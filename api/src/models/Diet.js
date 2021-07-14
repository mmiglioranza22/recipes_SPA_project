const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id: {
      type: DataTypes.INTEGER, // pedido por el README, pero ya siendo name la pk no haria falta, cada tipo de dieta es unico, nunca se repite
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