module.exports = class recipeSerializer {
  constructor(foodType, recipe) {
    this.foodType = foodType
    this.name = recipe.label
    this.recipeUrl = recipe.url
    this.numberOfIngredients = recipe.ingredients.length
    this.calorieCount = Math.ceil(recipe.calories);
    this.preparationTime = recipe.totalTime
  }
}
