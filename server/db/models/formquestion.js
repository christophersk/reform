const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('formquestion', {
  order: {
    type: Sequelize.INTEGER
  }
}, {
  tableName: 'FormQuestion'
})
