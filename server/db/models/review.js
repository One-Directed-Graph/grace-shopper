const Sequelize = require('sequelize')
const db = require('../db')

//associations are in models/index.js
const Review = db.define('review', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [4, 1000],
      notEmpty: true,
    },
    rating: {
      type: Sequelize.ENUM(1, 2, 3, 4, 5),
      allowNull: false,
    },
  },
})

module.exports = Review

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
