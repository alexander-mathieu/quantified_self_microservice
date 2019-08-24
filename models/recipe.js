'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    foodType: DataTypes.STRING,
    name: DataTypes.STRING,
    recipeUrl: DataTypes.STRING,
    numberOfIngredients: DataTypes.INTEGER,
    calorieCount: DataTypes.INTEGER,
    preparationTime: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
  };
  return Recipe;
};