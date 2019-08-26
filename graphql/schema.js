var { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Recipe {
    id: Int 
    foodType: String
    name: String
    recipeUrl: String
    numberOfIngredients: Int
    calorieCount: Int
    preparationTime: Int
  },
  type averageCalorieCount {
    foodType: String
    average: Float
  },
  type Query {
    recipes(foodType: String,
      numberOfIngredients: Int
      calorieCount: Int
      preparationTime: Int
      ): [Recipe] 

    averageCalorieCount(foodType: String!): [averageCalorieCount]
    numOfIngredients: [Recipe]
    preparationTime: [Recipe]
  }
`)