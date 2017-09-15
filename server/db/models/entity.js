const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('entity', {
  name: {
    type: Sequelize.STRING
  },
  typeAsInt: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  entityType: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      this.setDataValue('type', val);
      switch (val) {
        case 'person':
          this.setDataValue('typeAsInt', 1);
          break;
        case 'group':
          this.setDataValue('typeAsInt', 2);
          break;
        default:
          this.setDataValue('typeAsInt', 0);
          break;
      }
    }
  }
})
