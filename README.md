# Quantified Self

## About

## Endpoints

This service utilizes [GraphQL](https://graphql.org/). All queries are made to a single endpoint, `/graphql`.

### /graphql?query={recipes{*id,name*}}

Returns a list of all recipes in the database. The list will include all attributes specified in the bold portion of the request.  Additional attributes should be included as comma separated values, without any spacing. Available attributes for recipes are:
* id
* name
* foodType
* recipeUrl
* numberOfIngredients
* calorieCount
* preparationTime


Example of expected output:
```
{
  data: {
    recipes: [
      {
        id: 1,
        name: "Persian Chicken"
      },
      {
        id: 2,
        name: "Chicken Paprikash"
      }
    ]
  }
}
```

If your query contains an incorrect attribute, you will see something similar to:
```
{
  errors: [
    {
      message: "Cannot query field "incorrect" on type "Recipe".",
      locations: [
        {
          line: 1,
          column: 13
        }
      ]
    }
  ]
}
```

### /graphql?query={preparationTime{*id,name*}}

Returns a list of all recipes, sorted by preparation time from least to greatest. Recipes with a preparation time of 0 will no be included. Available attributes are the same as the recipe query:
* id
* name
* foodType
* recipeUrl
* numberOfIngredients
* calorieCount
* preparationTime

Example of expected output:
```
{
  data: {
    preparationTime: [
      {
        id: 6,
        name: "Kreplach (Chicken Dumplings)",
        preparationTime: 10
      },
      {
        id: 21,
        name: "Simple Turkey Gravy",
        preparationTime: 15
      }
    ]
  }
}
```

### /graphql?query={numOfIngredients{*id,name,numberOfIngredients*}}

Returns a list of all recipes, sorted by number of ingredients from least to greatest. Available attributes are the same as the recipe query:
* id
* name
* foodType
* recipeUrl
* numberOfIngredients
* calorieCount
* preparationTime

Example of expected output:
```
{
  data: {
    numOfIngredients: [
      {
        id: 17,
        name: "Grilled Porterhouse Steak",
        numberOfIngredients: 3
      },
      {
        id: 11,
        name: "Salt-And-Pepper Steak",
        numberOfIngredients: 4
      }
    ]
  }
}
```

### /graphql?query={averageCalorieCount(foodType:*"FOOD_TYPE"*){*average,foodType*}}

Returns the average calorie count for all recipes with the specified food type. A food type argument is required. The argument should be included as a string, without any spacing. The available attributes to return with averageCalorieCount are:
* average
* foodType

It is recommended you include both. Example of expected output:
```
{
  data: {
    averageCalorieCount: [
      {
        average: 3810.3,
        foodType: "chicken"
      }
    ]
  }
}
```

## Local Installation

### Requirements

* [Node 10.16.2](https://nodejs.org/en/download/) - Node Version

### Clone

```
$ git clone https://github.com/alexander-mathieu/quantified_self_microservice.git
$ cd quantified_self_microservice
$ npm install
```

### Setup Database

The database is setup using Postgres. In order to complete the setup:

* Install [Postgres](https://www.postgresql.org/download/)
* Create a `.env` file in the main directory
* Define `DB_USERNAME` within `.env` as your Postgres username
* Define `DB_DATABASE` within `.env` as `quantified_self_microservice_development`

Once setup is complete, run the following commands:
```
$ npx db:create
$ npx db:migrate
```

The database is seeded with resources using the [Edamam API](https://developer.edamam.com/). In order to seed, you will need an create an application through Edamam, then:
* Define your application's `EDAMAM_APP_ID` within `.env`
* Define your application's `EDAMAM_API_KEY` within `.env`

Once those steps are complete, run the command `$ npx jake seedDatabase`.

### API Exploration

Once installation and database setup are complete, explore the various API endpoints with the following steps:
* From the `quantified_self_microservice` project directory, boot up a server with `$ npm start`
* Open your browser, and visit `http://localhost:3000/`
* Query the available endpoints by appending to `http://localhost:3000/` in your browser

### Running Tests

Tests are implemented with Jest, and can be run with `$ npm test`.

Example of expected output:
```
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        4.725s
Ran all test suites.
