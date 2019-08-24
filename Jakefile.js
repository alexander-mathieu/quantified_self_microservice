var fetch = require('node-fetch');

task('seedDatabase', { async: true }, (foodString) => {
  let foodTypes = foodString.split(' ')

  for (let i = 0; i <= 2; i++) {
    fetch(`https://api.edamam.com/search?q=${foodTypes[i]}&app_id=API_ID&app_key=API_KEY`)
    .then(response => {
      return response.json()
    })
    .then(foodData => {
      foodData.hits.forEach(recipe => {
        console.log(recipe)
        let serializedRecipe = new recipeSerializer(recipe);

        let recipe = Recipe.build(serializedRecipe);
        recipe.save;
      })
    })
  }
})
