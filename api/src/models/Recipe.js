const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
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
      type: DataTypes.STRING,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
    },
    vegan: {
      type: DataTypes.BOOLEAN,
    },
    glutenFree: {
      type: DataTypes.BOOLEAN,
    }, 
    dairyFree: {
      type: DataTypes.BOOLEAN,
    }   
  });
  
};
