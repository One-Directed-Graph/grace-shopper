const Sequelize = require('sequelize')
const db = require('../db')

//ASSIGNED TO: Vinayak

//TODO: define properties
//TODO: Add ID
const Order = db.define('order', {
  currenPrice: {},
  currentProductId: {},
  quantity: {}
})

//ADD associations to models/index.js
//TODO: Belongs to user
//TODO: Has many products

module.exports = Order

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
