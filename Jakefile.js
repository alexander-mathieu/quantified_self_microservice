require('dotenv').config();

var fetch = require('node-fetch');

task('seedDatabase', { async: true }, (foodString) => {
  let foodTypes = foodString.split(' ')

  for (let i = 0; i <= 2; i++) {
    fetch(`https://api.edamam.com/search?q=${foodTypes[i]}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`)
    .then(response => {
      return response.json()
    })
    .then(foodData => {
      foodData.hits.forEach(recipe => {
        let serializedRecipe = new recipeSerializer(recipe);

        let recipe = Recipe.build(serializedRecipe);
        recipe.save;
      })
    })
  }
})
