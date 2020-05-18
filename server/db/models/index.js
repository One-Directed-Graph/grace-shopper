const User = require('./user')
const Review = require('./review')
const Category = require('./category')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderitem')
const Cart = require('./cart')

// /**
//  * If we had any associations to make, this would be a great place to put them!
//  * ex. if we had another model called BlogPost, we might say:
//  *
//  *    BlogPost.belongsTo(User)
//  */
//Category.belongsTo(Product)

OrderItem.belongsTo(Order, {otherKey: 'sessionId'})

Product.belongsTo(Category)
Category.hasMany(Product)
User.hasMany(Review)
User.hasMany(Order)
Review.belongsTo(User)
Review.belongsTo(Product)

Product.hasMany(Review)

Order.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
})

Order.hasMany(OrderItem)

OrderItem.belongsTo(Product)
OrderItem.belongsTo(Order)

Product.belongsTo(Category)

Cart.belongsTo(Product)
Cart.belongsTo(User)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Review,
  Order,
  OrderItem,
  Product,
  Category,
  Cart,
}
