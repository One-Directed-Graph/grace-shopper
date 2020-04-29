const Sequelize = require('sequelize')
const db = require('../db')

//ASSIGNED TO: Katt

//TODO: define properties
//TODO: Add ID
const Review = db.define('review', {
  rating: {},
  comments: {}
})

//ADD associations to models/index.js
//TODO: Belongs to product
//TODO: Belongs to user

module.exports = Review

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
