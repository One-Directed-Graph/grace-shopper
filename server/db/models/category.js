const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4, STRING} = Sequelize
//ASSIGNED TO: Aleks

//TODO: define properties
//TODO: Add ID
const Category = db.define('category', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
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
