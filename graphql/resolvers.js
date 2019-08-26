var Recipe = require('../models').Recipe;

module.exports = {
  getRecipes: (params) => {
    return Recipe.findAll({
      where: params
    })
  },
}
