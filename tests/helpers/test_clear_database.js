var Recipe = require('../../models').Recipe;

module.exports = async function cleanup() {
  await Recipe.destroy({ where: {} })
}
