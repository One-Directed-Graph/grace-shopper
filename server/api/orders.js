const router = require('express').Router()
//const Product = require('../db/models/product')
const Order = require('../db/models/order')
const OrderItem = require('../db/models/orderItem')
module.exports = router

router.get('/', async (req, res, next) => {
  //console.log('<><><><><><><><><>><><><><><><><>')
  try {
    const orders = await Order.findAll({include: OrderItem})
    console.log('from server side get orders', orders)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// router.get('/', (req, res, next) => {
//   console.log('><><><><><><><><><><><><><><><><><><><><><><><>')
//   Order.findAll()
//     .then((resp) => {
//       console.log(',.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,', resp.data)
//       res.json(resp.data)
//     })

//     .catch(next)
// })

router.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then((resp) => {
      res.status(200).send(resp)
    })
    .catch(next)
})
