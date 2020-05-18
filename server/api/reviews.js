const router = require('express').Router()
const Product = require('../db/models/product')
const Review = require('../db/models/review')
// const OrderItem = require('../db/models/orderitem')
// const {Op} = require('sequelize')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  console.log('in getReviews api')
  try {
    const reviews = await Review.findAll({
      where: {userId: req.params.userId},
      include: [{model: Product}],
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
