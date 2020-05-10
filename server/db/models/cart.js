const Sequelize = require('sequelize')
const db = require('../db')

//ASSIGNED TO: Vinayak

//TODO: define properties
//TODO: Add ID
const Cart = db.define('cart', {
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
})

//ADD associations to models/index.js

module.exports = Cart

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
