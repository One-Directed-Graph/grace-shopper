const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4, STRING, DECIMAL} = Sequelize

//ASSIGNED TO: Aleks

//TODO: define properties
//TODO: Add ID
const Product = db.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: DECIMAL,
    allowNull: false,
  },
  quantity: {
    type: DECIMAL,
  },

  img: {
    type: STRING,
    // defaultValue: './images/ireland.jpg',
  },
  // categoryId: {
  //   type: UUID,
  // },
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
