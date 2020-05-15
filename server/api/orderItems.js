const router = require('express').Router()
const Product = require('../db/models/product')
const Order = require('../db/models/order')
const OrderItem = require('../db/models/orderitem')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       include: [{model: OrderItem, include: {model: Product}}],
//     })
//     res.json(orders)
//   } catch (err) {
//     next(err)
//   }
// })
router.delete('/:id', (req, res, next) => {
  //console.log('<><><><><><><><><><><><><><><><>', req.params.id)
  OrderItem.findByPk(req.params.id)
    .then((item) => {
      res.sendStatus(204)
      item.destroy()
    })
    .catch(next)
})

router.get('/', async (req, res, next) => {
  try {
    const items = await OrderItem.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})
router.post('/', (req, res, next) => {
  //console.log(',.,.,.,.,.,.,.,.,.,.,', req.body)
  OrderItem.create(req.body)
    .then((resp) => {
      console.log(',.,.,.,.,.,.,.,.,.,.,', resp.id)

      res.status(200).send(resp)
      //OrderItem.create({orderId: resp.id})
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  //console.log(".,.,.,.,.,.,.,.,.,.,.", req.params.id);
  OrderItem.findByPk(req.params.id)
    .then((item) => {
      //console.log("<><><><><><><><><><><<<>>", req.body);
      item.update(req.body).then((employee) => res.send(employee))
    })

    .catch(next)
})
// Order.getOrdersByUser = function (req) {
//   return this.findAll({
//     where: {
//       userId: req.user.id,
//     },
//   })
// }
