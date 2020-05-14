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
    type: Sequelize.ENUM('Created', 'Processing', 'Completed', 'Cancelled'),
  },
  dateOfPurchase: {
    type: Sequelize.DATE,
    defaultValue: Date.now,
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
