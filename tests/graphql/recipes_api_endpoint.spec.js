var shell = require('shelljs');
var request = require('supertest')

var Recipe = require('../../models').Recipe;

var app = require('../../app');
var cleanup = require('../../tests/helpers/test_clear_database');

describe('Recipe api endpoint', () => {
  beforeEach(async function() {
    await cleanup();
    await Recipe.bulkCreate([
      {
        name: 'Turkey sandwich',
        recipeUrl: 'www.turkeysandwich.com',
        numberOfIngredients: 6, 
        foodType: 'turkey',
        calorieCount: 700,
        preparationTime: 10
      },
      {
        name: 'Turkey gravy',
        recipeUrl: 'www.turkeygravy.com',
        numberOfIngredients: 3,
        foodType: 'turkey',
        calorieCount: 100,
        preparationTime: 16
      },
      {
        name: 'Roast beef sandwich',
        recipeUrl: 'www.roastbeefsandwich.com',
        numberOfIngredients: 8,
        foodType: 'beef',
        calorieCount: 900,
        preparationTime: 10
      },
      {
        name: 'Beef gravy',
        recipeUrl: 'www.beefgravy.com',
        numberOfIngredients: 3,
        foodType: 'beef',
        calorieCount: 100,
        preparationTime: 16
      }
    ])
  })

  test('User can fetch all recipes', () => {
    return request(app)
    .get('/graphql?query={recipes{id,name,foodType,recipeUrl,numberOfIngredients,calorieCount,preparationTime}}')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.data.recipes.length).toBe(4)
      expect(Object.keys(response.body.data.recipes[0])).toContain('id')
      expect(Object.keys(response.body.data.recipes[0])).toContain('name')
      expect(Object.keys(response.body.data.recipes[0])).toContain('foodType')
      expect(Object.keys(response.body.data.recipes[0])).toContain('recipeUrl')
      expect(Object.keys(response.body.data.recipes[0])).toContain('numberOfIngredients')
      expect(Object.keys(response.body.data.recipes[0])).toContain('calorieCount')
      expect(Object.keys(response.body.data.recipes[0])).toContain('preparationTime')
    })
  })
  test('User can fetch recipes by food type', () => {
    return request(app)
    .get('/graphql?query={recipes(foodType:"turkey"){id,name,foodType}}')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.data.recipes.length).toBe(2)
      expect(Object.keys(response.body.data.recipes[0])).toContain('id')
      expect(Object.keys(response.body.data.recipes[0])).toContain('name')
      expect(Object.keys(response.body.data.recipes[0])).toContain('foodType')
      expect(Object.values(response.body.data.recipes[0])).not.toContain('beef')
      expect(Object.values(response.body.data.recipes[1])).not.toContain('beef')
    })
  })

  test('User can fetch recipes by number of ingredients', () => {
    return request(app)
    .get('/graphql?query={recipes(numberOfIngredients:3){id,name,numberOfIngredients}}')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.data.recipes.length).toBe(2)
      expect(Object.keys(response.body.data.recipes[0])).toContain('id')
      expect(Object.keys(response.body.data.recipes[0])).toContain('name')
      expect(Object.keys(response.body.data.recipes[0])).toContain('numberOfIngredients')
      expect(response.body.data.recipes[0].numberOfIngredients).toBe(3)
      expect(response.body.data.recipes[1].numberOfIngredients).toBe(3)
    })
  })

  test('User can fetch recipes by calorie count', () => {
    return request(app)
    .get('/graphql?query={recipes(calorieCount:100){id,name,calorieCount}}')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.data.recipes.length).toBe(2)
      expect(Object.keys(response.body.data.recipes[0])).toContain('id')
      expect(Object.keys(response.body.data.recipes[0])).toContain('name')
      expect(Object.keys(response.body.data.recipes[0])).toContain('calorieCount')
      expect(response.body.data.recipes[0].calorieCount).toBe(100)
      expect(response.body.data.recipes[1].calorieCount).toBe(100)
    })
  })
})