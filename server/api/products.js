const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('<><><><><><><><><>><><><><><><><>')
  try {
    const products = await Product.findAll()
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    //attributes: ['id', 'email'],
    console.log('from server side get products', products)
    res.json(products)
  } catch (err) {
    next(err)
  }
})
