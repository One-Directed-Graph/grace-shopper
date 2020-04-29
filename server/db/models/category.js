const Sequelize = require('sequelize')
const db = require('../db')

//ASSIGNED TO: Aleks

//TODO: define properties
//TODO: Add ID
const Category = db.define('category', {
  name: {},
  description: {}
})

module.exports = Category

//ADD associations to models/index.js

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
