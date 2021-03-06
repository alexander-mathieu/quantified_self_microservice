require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": process.env.DB_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "quantified_self_microservice_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "quantified_self_microservice_production",
    "host": "127.0.0.1",
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
