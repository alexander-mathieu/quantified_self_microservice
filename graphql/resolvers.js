var Recipe = require('../models').Recipe;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
  getRecipes: (params) => {
    return Recipe.findAll({
      where: params
    })
  },

  getAverageCalorieCount: (foodType) => {
    return Recipe.findAll({
      where: foodType,
      attributes: ['Recipe.foodType',[Sequelize.fn('avg', Sequelize.col('calorieCount')), 'average']],
      group: ['Recipe.foodType'],
      raw: true
    })
  },

  getRecipesByNumOfIngredients: () => {
    return Recipe.findAll({
      order: [['numberOfIngredients']]
    })
  },

  getRecipesByPrepTime: () => {
    return Recipe.findAll({
      where: {
        preparationTime: {
          [Op.gt]: 0
        }
      },
      order: [['preparationTime']]
    })
  }
}
