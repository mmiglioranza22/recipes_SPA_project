const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      
    },
    spoonacularScore: {
      type: DataTypes.STRING,
      
    },
    healthScore: {
      type: DataTypes.INTEGER,
      
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    analyzedInstructions: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.JSON)) // DataTypes.JSON directo?
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
    },
    sourceUrl: {
      type: DataTypes.TEXT,
    }, 
    image: {
      type: DataTypes.TEXT,
    }, 
    dietArray: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    }, 
     
    
  });
};
