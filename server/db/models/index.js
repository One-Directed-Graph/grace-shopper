const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Order = require('./order')
const Category = require('./category')

// /**
//  * If we had any associations to make, this would be a great place to put them!
//  * ex. if we had another model called BlogPost, we might say:
//  *
//  *    BlogPost.belongsTo(User)
//  */
//Category.belongsTo(Product)

Product.belongsTo(Category)
User.hasMany(Review)
Review.belongsTo(User)
Review.belongsTo(Product)

// /**
//  * We'll export all of our models here, so that any time a module needs a model,
//  * we can just require it from 'db/models'
//  * for example, we can say: const {User} = require('../db/models')
//  * instead of: const User = require('../db/models/user')
//  */
// module.exports = {
//   User,
//   Review,
// }
//User to Order relationship
//Order to Product relationship should be managed in FrontEnd
//User.hasMany(Order)
//Order.belongsTo(User)

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
  Category,
  Product,
}
