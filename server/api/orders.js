const router = require('express').Router()
const Product = require('../db/models/product')
const Order = require('../db/models/order')
const OrderItem = require('../db/models/orderitem')
module.exports = router

router.get('/cart/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {userId: req.params.userId, status: 'Cart'},
      include: {model: OrderItem, include: {model: Product}},
    })
    console.log(orders)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/order-list', async (req, res, next) => {
  try {
    const orders = await Order.findAll({where: {status: 'Processing'}})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  //console.log(',.,.,.,.,.,.,.,.,.,.,', req.body)
  Order.create(req.body)
    .then((resp) => {
      // console.log(',.,.,.,.,.,.,.,.,.,.,', resp.id)

      res.status(200).send(resp)
      //OrderItem.create({orderId: resp.id})
    })
    .catch(next)
})

Order.getOrdersByUser = function (req) {
  return this.findAll({
    where: {
      userId: req.user.id,
    },
  })
}
