const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('filledformquestion', {
  order: {
    type: Sequelize.INTEGER
  }
}, {
  tableName: 'FilledFormQuestion'
})
