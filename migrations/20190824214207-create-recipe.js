'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foodType: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      recipeUrl: {
        type: Sequelize.STRING
      },
      numberOfIngredients: {
        type: Sequelize.INTEGER
      },
      calorieCount: {
        type: Sequelize.INTEGER
      },
      preparationTime: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};