const Sequelize = require('sequelize')
const db = require('../db')

//ASSIGNED TO: Vinayak

//TODO: define properties
//TODO: Add ID
const OrderItem = db.define('orderitem', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  // productId: {
  //   type: Sequelize.UUID,
  // },
})

//ADD associations to models/index.js
//TODO: Belongs to user
//TODO: Has many products

module.exports = OrderItem

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
