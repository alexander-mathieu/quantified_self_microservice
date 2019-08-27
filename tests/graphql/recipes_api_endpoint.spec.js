var shell = require('shelljs');
var request = require('supertest')

var Recipe = require('../../models').Recipe;

var app = require('../../app');
var cleanup = require('../../tests/helpers/test_clear_database');

describe('recipes api endpoint', () => {
  beforeEach(async function() {
    await cleanup();

    await Recipe.bulkCreate([
      {
        name: 'Turkey Sandwich',
        recipeUrl: 'www.turkeysandwich.com',
        numberOfIngredients: 6,
        foodType: 'turkey',
        calorieCount: 700,
        preparationTime: 10
      },
      {
        name: 'Turkey Gravy',
        recipeUrl: 'www.turkeygravy.com',
        numberOfIngredients: 3,
        foodType: 'turkey',
        calorieCount: 100,
        preparationTime: 16
      },
      {
        name: 'Roast Beef Sandwich',
        recipeUrl: 'www.roastbeefsandwich.com',
        numberOfIngredients: 8,
        foodType: 'beef',
        calorieCount: 900,
        preparationTime: 10
      },
      {
        name: 'Beef Gravy',
        recipeUrl: 'www.beefgravy.com',
        numberOfIngredients: 3,
        foodType: 'beef',
        calorieCount: 100,
        preparationTime: 16
      }
    ])
  })

  test('user can fetch all recipes', () => {
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

  test('user can fetch recipes by food type', () => {
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

  test('user can fetch recipes by number of ingredients', () => {
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

  test('user can fetch recipes by calorie count', () => {
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

  test('user can fetch recipes ordered by number of ingredients', () => {
    return request(app)
    .get('/graphql?query={numOfIngredients{id,name,numberOfIngredients}}')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.numOfIngredients.length).toBe(4)
      expect(Object.keys(response.body.data.numOfIngredients[0])).toContain('id')
      expect(Object.keys(response.body.data.numOfIngredients[0])).toContain('name')
      expect(Object.keys(response.body.data.numOfIngredients[0])).toContain('numberOfIngredients')

      expect(response.body.data.numOfIngredients[0].numberOfIngredients).toBe(3)
      expect(response.body.data.numOfIngredients[1].numberOfIngredients).toBe(3)
      expect(response.body.data.numOfIngredients[2].numberOfIngredients).toBe(6)
      expect(response.body.data.numOfIngredients[3].numberOfIngredients).toBe(8)
    })
  })

  test('user can fetch recipes ordered by prep time', () => {
    return request(app)
    .get('/graphql?query={preparationTime{id,name,preparationTime}}')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.preparationTime.length).toBe(4)
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('id')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('name')
      expect(Object.keys(response.body.data.preparationTime[0])).toContain('preparationTime')

      expect(response.body.data.preparationTime[0].preparationTime).toBe(10)
      expect(response.body.data.preparationTime[1].preparationTime).toBe(10)
      expect(response.body.data.preparationTime[2].preparationTime).toBe(16)
      expect(response.body.data.preparationTime[3].preparationTime).toBe(16)
    })
  })

  test('user can fetch average calories for a food type', () => {
    return request(app)
    .get('/graphql?query={averageCalorieCount(foodType:"beef"){average,foodType}}')
    .then(response => {
      expect(response.statusCode).toBe(200)

      expect(response.body.data.averageCalorieCount[0].average).toBe(500)
      expect(response.body.data.averageCalorieCount[0].foodType).toBe('beef')
    })
  })
})
