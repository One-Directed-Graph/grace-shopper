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
  sessionId: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM(
      'Cart',
      'Processing',
      'Completed',
      'Cancelled',
      'Shipped'
    ),
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

Order.prototype.getAllOrderItems = function () {
  return db.OrderItem.findAll({where: {orderId: this.id}})
}

/**
 * classMethods
 */

/**
 * hooks
 */
