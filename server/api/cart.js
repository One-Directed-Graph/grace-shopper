const router = require('express').Router()
//const Product = require('../db/models/product')
const Cart = require('../db/models/cart')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()

    res.json(cart)
  } catch (err) {
    next(err)
  }
})
