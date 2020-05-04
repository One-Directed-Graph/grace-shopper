const router = require('express').Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')
module.exports = router

router.get('/', async (req, res, next) => {
  //console.log('<><><><><><><><><>><><><><><><><>')
  try {
    const products = await Product.findAll()
    // console.log('from server side get products', products)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  console.log('<><><><><><><><><>><><><><><><><>', req.params.id)
  try {
    const product = await Product.findByPk(req.params.id, {include: Category})
    console.log('from server side get products', product)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
