const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('answer', {
  content: {
    type: Sequelize.TEXT
  }
})
