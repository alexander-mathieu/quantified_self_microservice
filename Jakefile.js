require('dotenv').config();

var fetch = require('node-fetch');

var Recipe = require('./models').Recipe;

var recipeSerializer = require('./serializers/recipe_serializer');

task('seedDatabase', { async: true }, (foodString) => {
  let foodTypes = foodString.split(' ')

  for (let i = 0; i <= 2; i++) {
    fetch(`https://api.edamam.com/search?q=${foodTypes[i]}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(foodData => {
      let foodType = foodData.q

      foodData.hits.forEach(recipeData => {
        let serializedRecipe = new recipeSerializer(foodType, recipeData.recipe);

        return Recipe.create(serializedRecipe)
        .then(recipe => {
          console.log(`Created ${recipe.name}.`);
        })
      })
    })
  }
})
