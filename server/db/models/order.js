const Sequelize = require('sequelize')
const db = require('../db')

//ASSIGNED TO: Vinayak

//TODO: define properties
//TODO: Add ID
const Order = db.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: Sequelize.STRING, //to be converted to Sequelize.ENUM with order status values
  },
  dateOfPurchase: {
    type: Sequelize.DATE,
  },
  products: {
    type: Sequelize.JSON, // productId, price, qty
  },
  subTotal: {
    type: Sequelize.DECIMAL,
  },
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
