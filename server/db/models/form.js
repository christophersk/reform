const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('form', {
  name: {
    type: Sequelize.STRING,
    get () {
      if (this.getDataValue('name') === null) {
        return '';
      } else {
        return this.getDataValue('name');
      }
    }
  }
})
