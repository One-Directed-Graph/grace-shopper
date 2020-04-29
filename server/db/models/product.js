const Sequelize = require('sequelize')
const db = require('../db')

//ASSIGNED TO: Aleks

//TODO: define properties
//TODO: Add ID
const Product = db.define('product', {
  title: {},
  description: {},
  price: {},
  quantity: {},
  category: {},
  image: {}
})

//ADD associations to models/index.js

module.exports = Product

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
