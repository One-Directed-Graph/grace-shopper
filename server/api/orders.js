const router = require('express').Router()
const Product = require('../db/models/product')
const Order = require('../db/models/order')
const OrderItem = require('../db/models/orderitem')
const {Op} = require('sequelize')
module.exports = router

router.get('/cart/:userId', async (req, res, next) => {
  console.log('route.POPOPOPOPOPOPOPOPOPOPOPOPOPO', req.params, req.session.id)
  try {
    const orders = await Order.findOne({
      where: {userId: req.params.userId}, //, status: 'Cart'
      include: {model: OrderItem, include: {model: Product}},
    })
    // if (!orders) {
    //   Order.create({userId: req.params.userId, orderItems: []}).then(
    //     (response) => {
    //       res.status(200).send(response)
    //     }
    //   )
    // }
    console.log(',.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,,.', orders)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.post('/session', async (req, res, next) => {
  console.log('<><><><><><><><><><><>>', req.session.id, req.params.prodId)

  Order.create({sessionId: req.session.id, orderitems: []})
    .then((resp) => {
      console.log(resp)
      res.status(200).send(resp)
    })
    .catch(next)

  // Order.findOne({
  //   where: {sessionId: req.session.id},
  //   include: {model: OrderItem, include: {model: Product}},
  // }).then((response) => {
  //   console.log('><><><><><><><><><><<><><><><>><><><>><><', response)
  // })
})

router.get('/session', async (req, res, next) => {
  console.log('req.session.id', req.session.id)
  try {
    const sessionCart = await Order.findOne({
      where: {sessionId: req.session.id},
      include: {model: OrderItem, include: {model: Product}}, //include: {model: Product}
    })
    console.log('><><><><><><><><><><<><><><><>><><><>><><', sessionCart)
    res.send(sessionCart)
  } catch (err) {
    console.log('errerrerrerrerrerr', err)
    next(err)
  }
})

router.get('/order-list', async (req, res, next) => {
  console.log('in getOrderList api')
  try {
    const orders = await Order.findAll({
      where: {
        status: {
          [Op.notIn]: ['Cart', 'Cancelled'],
        },
      },
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  console.log('in getOrders api')
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.userId},
      include: [{model: OrderItem}],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then((order) => order.update(req.body))
    .then((order) => res.json(order))
    .catch(next)
})

router.put('/order-list/', (req, res, next) => {
  console.log('in update order api', req.body)
  Order.findByPk(req.body.id)
    .then((order) => order.update({status: req.body.status}))
    .then((order) => res.json(order))
    .catch(next)
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
