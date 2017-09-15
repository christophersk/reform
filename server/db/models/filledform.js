const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('filledform', {
  name: {
    type: Sequelize.STRING
  }
})
