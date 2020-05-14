const router = require('express').Router()
const Product = require('../db/models/product')
const Order = require('../db/models/order')
const OrderItem = require('../db/models/orderitem')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {model: OrderItem, include: {model: Product}},
    })
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
