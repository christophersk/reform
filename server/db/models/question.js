const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('question', {
  content: {
    type: Sequelize.TEXT
  },
  number: {
    type: Sequelize.INTEGER
  },
  typeAsInt: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  questionType: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      this.setDataValue('type', val);
      switch (val) {
        case 'text':
          this.setDataValue('typeAsInt', 1);
          break;
        case 'radio':
          this.setDataValue('typeAsInt', 2);
          break;
        case 'checkbox':
          this.setDataValue('typeAsInt', 3);
          break;
        default:
          this.setDataValue('typeAsInt', 0);
          break;
      }
    }
  }
})
