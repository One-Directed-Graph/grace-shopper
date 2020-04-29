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
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
      notEmpty: true,
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
